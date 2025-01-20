'use server'
import {
  signinFormSchema,
  signinFormValues,
} from '@/validations/signin-validation'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { findUserByEmail } from '@/lib/database/user'
import { generateVerificationToken } from '@/lib/database/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export const signin = async (values: signinFormValues) => {
  const parsedValues = signinFormSchema.safeParse(values)
  if (!parsedValues.success) {
    return { error: 'Invalid Values' }
  }
  const { email, password } = parsedValues.data

  const existingUser = await findUserByEmail(email)
  if (!existingUser || !existingUser.password) {
    return { error: 'Invalid credentials' }
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return {
      error: 'Your account is not verified. Please check your email.',
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
    return { success: 'success' }
  } catch (error) {
    if (isRedirectError(error)) throw error
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        case 'AccessDenied':
          return {
            error: 'Your account is not verified. Please check your email.',
          }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    throw error
  }
}
