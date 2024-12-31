'use server'

import { signIn } from '@/lib/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export const oauthSining = async (provider: 'google' | 'github') => {
  try {
    await signIn(provider, { redirectTo: '/dashboard' })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.error(error)
  }
}
