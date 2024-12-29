'use client'

import { oauthSining } from '@/actions/oAuthSignin'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const socialSignin = async (provider: 'google' | 'github') => {
  await oauthSining(provider)
}

const SocialButtons = () => {
  return (
    <div className='flex items-center gap-x-3'>
      <Button
        size={'lg'}
        className='w-full dark:bg-secondary dark:hover:bg-secondary/80'
        variant='outline'
        onClick={() => {
          socialSignin('google')
        }}
      >
        <FcGoogle className='size-5' />
      </Button>
      <Button
        size={'lg'}
        className='w-full dark:bg-secondary dark:hover:bg-secondary/80'
        variant='outline'
        onClick={() => {
          socialSignin('github')
        }}
      >
        <FaGithub className='size-5' />
      </Button>
    </div>
  )
}
export default SocialButtons
