import { type JWT as DefaultJWT } from 'next-auth/jwt'
import { User } from '@prisma/client'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: User['id']
  }
}
