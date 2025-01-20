import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='container flex min-h-full items-center justify-center p-6'>
      <div className='flex flex-col gap-4 lg:flex-row-reverse'>
        <div className='flex flex-1 items-center justify-center'>
          <Image
            src='/desktop-hero.webp'
            width={1792}
            height={1024}
            priority
            alt='Authenticate-desktop-hero'
            className='hidden shadow-lg sm:block'
          />
          <Image
            src='/mobile-hero.webp'
            width={1024}
            height={1024}
            priority
            alt='Authenticate-mobile-hero'
            className='shadow-lg sm:hidden'
          />
        </div>
        <div className='flex aspect-video flex-col justify-center gap-6 rounded-lg bg-muted/50 px-6 py-10 shadow-lg md:px-16 lg:w-4/12'>
          <h1 className='text-2xl font-bold sm:text-3xl lg:text-4xl'>
            Secure Your Access, Simplify Your Login 🔐
          </h1>
          <Link href='/auth/signin' className='mt-6 block w-full'>
            <Button
              variant='default'
              size={'lg'}
              className='flex items-center gap-2'
            >
              <span>Log in</span>
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
