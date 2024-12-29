import { z } from 'zod'

export const signinFormSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required.')
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(32, { message: 'Password must be at most 32 characters long.' }),
})

export type signinFormValues = z.infer<typeof signinFormSchema>
