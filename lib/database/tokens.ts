import 'server-only'
import { prisma } from '@/lib/prisma'
import { v4 as uuid4 } from 'uuid'
import { getVerificationTokenByEmail } from './verification-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuid4()
  const now = new Date().getTime()
  const expires = new Date(now + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return verificationToken
}
