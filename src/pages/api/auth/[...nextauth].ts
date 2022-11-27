import NextAuth, { type NextAuthOptions } from 'next-auth'
import SlackProvider from 'next-auth/providers/slack'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
