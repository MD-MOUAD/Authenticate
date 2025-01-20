'use server'

import { generateVerificationToken } from '@/lib/database/tokens'
import { findUserByEmail } from '@/lib/database/user'
import { sendVerificationEmail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import {
  signupFormSchema,
  signupFormValues,
} from '@/validations/signup-validation'
import bcrypt from 'bcryptjs'

export const signup = async (values: signupFormValues) => {
  const parsedValues = signupFormSchema.safeParse(values)
  if (!parsedValues.success) {
    return { error: 'Invalid values' }
  }

  const { name, email, password } = parsedValues.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    return { error: 'Email already in use.' }
  }
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)
  return { success: 'Confirmation email sent!' }
}
