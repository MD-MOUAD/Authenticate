import { Button } from '@/components/ui/button'
import { auth, signOut } from '@/lib/auth'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/auth/signin')
  return (
    <div className='container h-full pt-10'>
      <h1 className='text-ce` text-4xl font-bold'>Welcome to your Dashboard</h1>
      <p>id: {session?.user?.id}</p>
      <p>name: {session?.user?.name}</p>
      <p>email: {session?.user?.email}</p>
      {session?.user?.image && (
        <div className='size-44'>
          <Image
            src={session?.user?.image}
            alt='profile img'
            width={96}
            height={96}
            className='rounded-full'
          />
        </div>
      )}
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/' })
        }}
      >
        <Button className='flex items-center gap-2' variant='destructive'>
          <LogOut size={24} strokeWidth={3} /> <span>Logout</span>
        </Button>
      </form>
    </div>
  )
}
