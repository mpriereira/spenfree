import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email || !user.id) return false
      
      // Create or update user in the database
      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          authId: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        },
        update: {
          authId: user.id,
          name: user.name,
          image: user.image
        }
      })
      
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        // Find user by authId to get our internal ID
        const dbUser = await prisma.user.findUnique({
          where: { authId: token.sub as string }
        })
        
        session.user.id = dbUser?.id as string // Use our internal ID
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}) 