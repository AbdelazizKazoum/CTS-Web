// Library imports
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// types imports
import type { NextAuthConfig, Session, User } from 'next-auth'

import type { JWT } from 'next-auth/jwt'

import type { AdapterUser } from 'next-auth/adapters'

import type { AuthType } from '@/types/authTypes'

// import { CredentialsType, SocialCredentialsType } from '@/types/authTypes'
import api from './lib/api'

// Modify NextAuth types with custom properties
declare module 'next-auth' {
  interface User extends AuthType {}
}
declare module 'next-auth/adapters' {
  interface AdapterUser extends AuthType {}
}
declare module 'next-auth/jwt' {
  interface JWT extends AuthType {}
}

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      authorize: async credentials => {
        try {
          const { data } = await api.post('/auth/login', credentials)

          return data
        } catch (error) {
          console.error('Error during authentication', error)

          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.userData = {
          id: user.userData.id,
          avatar: user.userData.avatar,
          nom: user.userData.nom,
          prenom: user.userData.prenom,
          direction: user.userData.direction,
          role: user.userData.role
        }
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Create object with token properties
      const userObject: AdapterUser = {
        userData: {
          id: token.userData.id,
          avatar: token.userData.avatar,
          nom: token.userData.nom,
          prenom: token.userData.prenom,
          direction: token.userData.direction,
          role: token.userData.role
        },

        id: token?.userData?.id as string,
        email: '',
        emailVerified: null,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      }

      session.user = userObject

      return session
    }
  },
  pages: {
    signIn: '/login' // Custom sign-in page
    // error: "/auth/error", // Custom error page
  },
  session: {
    strategy: 'jwt'
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
