import { CheckCircle } from 'lucide-react'

import React from 'react'

const FormSuccess = ({ message }: { message: string | undefined }) => {
  if (!message) {
    return null
  }
  return (
    <p className='space-x-1.5 rounded-md bg-emerald-500/15 p-2.5 text-sm font-medium text-emerald-500'>
      <CheckCircle className='inline size-3.5' />
      <span>{message}</span>
    </p>
  )
}

export default FormSuccess
