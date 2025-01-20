import 'server-only'
import { prisma } from '@/lib/prisma'

export const findUserByEmail = async (email: string) => {
  try {
    const newUser = await prisma.user.findUnique({
      where: { email },
    })
    return newUser
  } catch {
    return null
  }
}

export const findUserById = async (id: string) => {
  try {
    const newUser = await prisma.user.findUnique({
      where: { id },
    })
    return newUser
  } catch {
    return null
  }
}
