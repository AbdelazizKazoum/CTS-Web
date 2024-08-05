/* eslint-disable import/no-unresolved */
import { create } from 'zustand'

import { toast } from 'react-toastify'

import type { AuthType } from '@/types/authTypes'

import api from '@/lib/api'

import { handleSession } from '@/lib/handleSession'

interface authStoreState {
  authData: AuthType | null
  statusCode: number | null
  message: string | null

  login: (password: string, cin: string) => Promise<AuthType>
  logout: () => void
}

export const UseAuthStore = create<authStoreState>(set => ({
  authData: null,
  statusCode: null,
  message: null,

  login: async (password: string, cin: string) => {
    try {
      console.log('enter')
      const res = await api.post('/auth/login', { password, cin })
      const authData = res.data

      if (authData.token) {
        set({ authData })
        set({ statusCode: authData.status })
        set({ message: authData.message })

        console.log(authData)

        localStorage.setItem('token', authData.token)
        localStorage.setItem('userData', authData.payload)
        handleSession(authData.token)

        console.log('hello world')
      } else {
        console.log(authData)
      }

      return authData
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message)
      console.log(error)

      return null
    }
  },

  logout: async () => {
    // localStorage.removeItem('token')                                                                                            //////////////////////////////////////////////////////////////
    localStorage.removeItem('userData')
  }
}))
