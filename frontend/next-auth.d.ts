import 'next-auth/jwt'

import type { DefaultSession } from 'next-auth'

import type { DefaultJWT } from 'next-auth/jwt'

import type { AuthType } from '@/types/authTypes'

declare module 'next-auth/jwt' {
  type JWT = AuthType & DefaultJWT
}

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      nom: string
      prenom: string
      direction: string

      role: string
    } & DefaultSession['']

    expires?: string

    accessToken: string
  }

  type User = AuthType
}
