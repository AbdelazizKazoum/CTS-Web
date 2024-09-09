import 'next-auth/jwt'

import type { DefaultSession } from 'next-auth'

import type { AuthType } from '@/types/authTypes'

declare module 'next-auth/jwt' {
  type JWT = AuthType
}

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      nom: string
      prenom: string
      direction: string

      role: string
    } & DefaultSession['user']

    accessToken: string
  }

  type User = AuthType
}
