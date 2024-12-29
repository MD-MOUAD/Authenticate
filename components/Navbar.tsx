import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'

export const Navbar = () => {
  return (
    <nav className='h-[var(--navbar-height)] border-b'>
      <div className='container flex h-full items-center justify-between'>
        <h3 className='text-xl font-semibold tracking-tight text-primary'>
          <Link href='/'>Authenticate🔐</Link>
        </h3>
        <ModeToggle />
      </div>
    </nav>
  )
}
