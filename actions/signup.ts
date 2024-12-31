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
  
}
