import {
  signinFormSchema,
  signinFormValues,
} from '@/validations/signin-validation'

export const signin = async (values: signinFormValues) => {
  const parsedValues = signinFormSchema.safeParse(values)
  if (!parsedValues.success) {
    console.log('error')
  }
}
