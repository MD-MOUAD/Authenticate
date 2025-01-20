import { type User as DefaultUser } from 'next-auth'
import { type JWT as DefaultJWT } from 'next-auth/jwt'
import { type User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface User extends DefaultUser {
    // user.role (id is defined in latest versions)
    role: PrismaUser['role']
    emailVerified: PrismaUser['emailVerified']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    // token.id & token.role
    id: PrismaUser['id']
    role: PrismaUser['role']
  }
}
