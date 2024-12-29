import SocialButtons from '@/components/auth/SocialButtons'
import { SigninForm } from '@/components/forms/signin-form'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <div className='container h-full items-center justify-center pt-6 lg:flex'>
      <div className='lg:flex'>
        <div className='mx-auto flex max-w-[500px] flex-col justify-between gap-4 rounded-l-lg border bg-primary-foreground p-6 shadow-lg lg:aspect-square lg:w-[600px]'>
          {/* Heading */}
          <div className='mb-4 space-y-1'>
            <h3 className='text-center text-2xl font-semibold tracking-tight'>
              Authenticate 🔐
            </h3>
            <p className='text-center text-sm text-muted-foreground'>
              Welcome back 👋
            </p>
          </div>

          <SocialButtons />

          {/* Spacer */}
          <div className='mt-2 flex items-center gap-3'>
            <div className='h-1 flex-1 bg-muted' />
            <span className='text-sm font-medium text-muted-foreground'>
              or
            </span>
            <div className='h-1 flex-1 bg-muted' />
          </div>

          <SigninForm />

          {/* Go to Signup Link */}
          <p className='text-center text-sm'>
            Don&apos;t have an account? Click{' '}
            <Button variant='link' size='sm' className='px-0 font-bold' asChild>
              <Link href='/auth/signup'>here</Link>
            </Button>{' '}
            to sign up.
          </p>
        </div>
        <div className='hidden w-[600px] lg:block'>
          <Image
            src='/mobile-hero.webp'
            width={1024}
            height={1024}
            priority
            alt='Authenticate-mobile-hero'
            className='rounded-r-lg shadow-lg'
          />
        </div>
      </div>
    </div>
  )
}
