import { z } from 'zod'

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required.')
      .min(3, { message: 'Your name must be at least 3 characters long.' })
      .max(32, { message: 'Your name must be at most 32 characters long.' }),
    email: z
      .string()
      .nonempty('Email is required.')
      .email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .nonempty('Password is required.')
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(32, { message: 'Password must be at most 32 characters long.' }),

    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm Password must match the Password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type signupFormValues = z.infer<typeof signupFormSchema>
