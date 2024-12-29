import SocialButtons from '@/components/auth/SocialButtons'
import { SignupForm } from '@/components/forms/signup-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div className='container h-full pt-10'>
      <div className='mx-auto flex max-w-[400px] flex-col gap-2 rounded-lg border bg-primary-foreground p-6 shadow-lg lg:w-[500px]'>
        <div className='mb-4 space-y-1'>
          <h3 className='text-center text-2xl font-semibold tracking-tight'>
            Authenticate 🔐
          </h3>
          <p className='text-center text-sm text-muted-foreground'>
            Quick Signup using
          </p>
        </div>
        <SocialButtons />
        <div className='mt-2 flex items-center gap-3'>
          <div className='h-1 flex-1 bg-muted' />
          <span className='text-sm font-medium text-muted-foreground'>or</span>
          <div className='h-1 flex-1 bg-muted' />
        </div>
        <SignupForm />
        {/* Go to Signin Link */}
        <p className='text-center text-sm'>
          Already have an account? Click{' '}
          <Button variant='link' size='sm' className='px-0 font-bold' asChild>
            <Link href='/auth/signin'>here</Link>
          </Button>{' '}
          to sign in.
        </p>
      </div>
    </div>
  )
}
