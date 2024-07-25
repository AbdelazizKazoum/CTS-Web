import { create } from 'zustand'

// eslint-disable-next-line import/no-unresolved
import api from '@/lib/api'

import type { UtilisateurType } from '@/types/userTypes'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export interface UtilisateurState {
  users: UtilisateurType[] | null

  fetchUsers: () => Promise<UtilisateurType[]>
  createUser: (user: UtilisateurType) => Promise<UtilisateurType> | Promise<Error>
}

export const UseUtilisateurStore = create<UtilisateurState>(set => ({
  users: [],

  fetchUsers: async () => {
    try {
      const { data } = await api.get('/utilisateur')

      const users = data

      set({ users })

      console.log('test data from the api :', data)

      return users
    } catch (error) {
      console.log(error)
    }
  },

  createUser: async (user: UtilisateurType) => {
    try {
      const { data } = await api.post('utilisateur', user)

      console.log('user created :', data)

      if (data.status !== 400) {
        toast.success('User created successfully')
      } else {
        toast.error(data.message)
      }

      return data
    } catch (error: any) {
      console.log(error)
      toast.error(error?.message)

      return null
    }
  }
}))
