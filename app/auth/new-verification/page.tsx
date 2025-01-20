import NewVerificationForm from '@/components/forms/new-verification-form'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default async function Page() {
  return (
    <div className='container h-full pt-10'>
      <Suspense fallback={<NewVerificationFormSkeleton />}>
        <NewVerificationForm />
      </Suspense>
    </div>
  )
}

const NewVerificationFormSkeleton = () => {
  return (
    <div className='mx-auto flex max-w-[400px] flex-col gap-2 rounded-lg border bg-primary-foreground p-6 shadow-lg lg:w-[500px]'>
      <div className='mb-4 flex flex-col items-center gap-2'>
        <h3 className='text-center text-2xl font-semibold tracking-tight'>
          Authenticate 🔐
        </h3>
        <p className='text-center text-lg text-muted-foreground'>
          Confirming your verification
        </p>
        <BeatLoader />

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
