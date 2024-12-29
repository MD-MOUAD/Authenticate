'use server'

import {
  signinFormSchema,
  signinFormValues,
} from '@/validations/signin-validation'

export const signin = async (values: signinFormValues) => {
  const parsedValues = signinFormSchema.safeParse(values)

  if (!parsedValues.success) {
    console.log('error')
  }
  const success = parsedValues.data?.email === 'gamepass999@gmail.com'
  if (success) {
    return { success: 'Login success' }
  } else {
    return { error: 'Invalid Credentials' }
  }
}
