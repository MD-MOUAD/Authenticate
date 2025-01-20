import { AdapterUser as DefaultAdapterUser } from '@auth/core/adapters'
import { User as PrismaUser } from '@prisma/client'

declare module '@auth/core/adapters' {
  export interface AdapterUser extends DefaultAdapterUser {
    role: PrismaUser['role']
  }
}
