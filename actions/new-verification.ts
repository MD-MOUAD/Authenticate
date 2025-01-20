'use server'

import { findUserByEmail } from '@/lib/database/user'
import { getVerificationTokenByToken } from '@/lib/database/verification-token'
import { prisma } from '@/lib/prisma'

export const newVerification = async (token: string) => {
  console.log('first')
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken)
    return {
      error:
        'The verification link is invalid. Please check the link or request a new one.',
    }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'This verification link has expired!' }

  const existingUser = await findUserByEmail(existingToken.email)

  if (!existingUser) return { error: 'Email does not exist!' }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      // if user want to change his email
      email: existingToken.email,
    },
  })

  await prisma.verificationToken.delete({ where: { id: existingToken.id } })

  return { success: 'Email verified!' }
}
