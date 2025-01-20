'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { BeatLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { newVerification } from '@/actions/new-verification'
import FormError from '@/components/forms/form-error'
import FormSuccess from '@/components/forms/form-success'

const NewVerificationForm = () => {
  const token = useSearchParams().get('token')
  const [formError, setFormError] = useState<string | undefined>()
  const [formSuccess, setFormSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const onSubmit = useCallback(async () => {
    setFormError('')
    setFormSuccess('')

    if (!token) {
      setFormError(
        'The verification link is invalid. Please check the link or request a new one.'
      )
      return
    }

    try {
      const res = await newVerification(token)
      startTransition(() => {
        if (res.success) {
          setFormSuccess(res.success)
        } else {
          setFormError(
            res.error ||
              'Verification failed. Please try again later or contact support for assistance.'
          )
        }
      })
    } catch {
      setFormError(
        'An unexpected error occurred while processing your verification request. Please refresh the page and try again.'
      )
    }
  }, [token])

  useEffect(() => {
    startTransition(() => {
      onSubmit()
    })
  }, [onSubmit])

  return (
    <div className='mx-auto flex max-w-[400px] flex-col gap-2 rounded-lg border bg-primary-foreground p-6 shadow-lg lg:w-[500px]'>
      <div className='mb-4 flex flex-col items-center gap-2'>
        <h3 className='text-center text-2xl font-semibold tracking-tight'>
          Authenticate 🔐
        </h3>
        <p className='text-center text-lg text-muted-foreground'>
          Confirming your verification
        </p>
        {/* Show loader during the transition */}
        {isPending && <BeatLoader />}
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        <Button
          variant='link'
          size='sm'
          className='text-base font-bold'
          asChild
        >
          <Link href='/auth/signin'>Back to sign in</Link>
        </Button>
      </div>
    </div>
  )
}

export default NewVerificationForm
