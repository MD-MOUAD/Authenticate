'use server'

import { prisma } from '@/lib/prisma'

export const oauthVerifyEmailAction = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      emailVerified: true,
    },
  })

  if (existingUser && !existingUser.password && !existingUser.emailVerified) {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    })
  }
}
