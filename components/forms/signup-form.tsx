'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  signupFormSchema,
  type signupFormValues,
} from '@/validations/signup-validation'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { signup } from '@/actions/signup'
import FormError from '@/components/forms/form-error'
import FormSuccess from '@/components/forms/form-success'

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState<string | undefined>('')
  const [formSuccess, setFormSuccess] = useState<string | undefined>('')

  const form = useForm<signupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: signupFormValues) {
    setFormError('')
    setFormSuccess('')

    const res = await signup(values)
    if (res.success) {
      form.reset()
      setFormSuccess(res.success)
    } else {
      setFormError(res.error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
      >
        {/* Name*/}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='pr-8 text-sm'
                  placeholder='eg. John Doe'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email*/}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='pr-8 text-sm'
                  placeholder='eg. you@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className='pr-8 text-sm'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <button
                  type='button'
                  className='absolute right-2 top-1/2 -translate-y-1/2 transform'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye
                      className='size-4 font-bold text-primary'
                      strokeWidth={3}
                    />
                  ) : (
                    <EyeOff className='size-4 font-bold' strokeWidth={3} />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Confirm Password */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className='pr-8 text-sm'
                    placeholder='Confirm password'
                    {...field}
                  />
                </FormControl>
                <button
                  type='button'
                  className='absolute right-2 top-1/2 -translate-y-1/2 transform'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye
                      className='size-4 font-bold text-primary'
                      strokeWidth={3}
                    />
                  ) : (
                    <EyeOff className='size-4 font-bold' strokeWidth={3} />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          className='w-full'
        >
          Sign up
        </Button>
      </form>
    </Form>
  )
}
