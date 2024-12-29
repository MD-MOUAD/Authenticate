'use server'

import {
  signupFormSchema,
  signupFormValues,
} from '@/validations/signup-validation'

export const signup = async (values: signupFormValues) => {
  const parsedValues = signupFormSchema.safeParse(values)

  if (!parsedValues.success) {
    console.log('error')
  }
  const success = parsedValues.data?.email === 'gamepass999@gmail.com'
  if (success) {
    return { success: 'Email Sent' }
  } else {
    return { error: 'This Email Already exits!' }
  }
}
