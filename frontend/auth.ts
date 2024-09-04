/* eslint-disable import/no-unresolved */
import NextAuth from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from './auth.config'
import api from '@/lib/api'

async function login(cin: string, password: string) {
  try {
    const res = await api.post('/auth/login', {
      cin,
      password
    })

    return res
  } catch (error) {
    console.error('Failed to fetch user:', error)

    throw new Error('Authentification failes !')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ cni: z.string(), password: z.string().min(6) }).safeParse(credentials)

        if (parsedCredentials.success) {
          const { cni, password } = parsedCredentials.data

          const userData = await login(cni, password)

          if (!userData) return null

          return userData
        }

        console.log('Invalid credentials')

        return null
      }
    })
  ]
})
