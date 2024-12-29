import { AlertTriangle } from 'lucide-react'

import React from 'react'

const FormError = ({ message }: { message: string | undefined }) => {
  if (!message) {
    return null
  }
  return (
    <p className='space-x-1.5 rounded-md bg-destructive/15 p-2.5 text-sm font-medium text-destructive dark:bg-destructive/55 dark:text-white/75'>
      <AlertTriangle className='inline size-3.5' />
      <span>{message}</span>
    </p>
  )
}

export default FormError
