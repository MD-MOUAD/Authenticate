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
  signinFormSchema,
  type signinFormValues,
} from '@/validations/signin-validation'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { signin } from '@/actions/signin'
import FormError from './form-error'

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | undefined>('')

  const form = useForm<signinFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: signinFormValues) {
    setFormError('')

    const res = await signin(values)
    if (res.success) {
      alert(res.success)
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
        <FormError message={formError} />
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          className='w-full'
        >
          Sign in
        </Button>
      </form>
    </Form>
  )
}
