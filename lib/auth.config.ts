import type { NextAuthConfig } from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { signinFormSchema } from '@/validations/signin-validation'
import bcrypt from 'bcryptjs'
import { oauthVerifyEmailAction } from '@/actions/oAuthEmailVerification'

const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    jwt({ token, user, profile }) {
      console.log({ profile })
      // User is available during sign-in
      if (user?.id) token.id = user.id
      if (user?.role) token.role = user.role

      return token
    },
    session({ token, session }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
    signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        return !!profile?.email_verified
      }
      if (account?.provider === 'github') {
        return true
      }
      if (account?.provider === 'credentials') {
        if (user.emailVerified) {
          return true
        }
        return false
      }
      return false
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (['google', 'github'].includes(account.provider)) {
        if (user.email) await oauthVerifyEmailAction(user.email)
      }
    },
  },
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const parsedValues = signinFormSchema.safeParse(credentials)
        if (parsedValues.success) {
          const { email, password } = parsedValues.data
          const user = await prisma.user.findUnique({
            where: { email },
          })
          if (!user || !user.password) {
            return null
          }
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig

export default authConfig
