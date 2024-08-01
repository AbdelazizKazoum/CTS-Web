import { create } from 'zustand'

import { toast } from 'react-toastify'

// eslint-disable-next-line import/no-unresolved
import api from '@/lib/api'

import type { UtilisateurType } from '@/types/userTypes'

export interface UtilisateurState {
  users: UtilisateurType[] | null
  loading: boolean
  error: string

  fetchUsers: () => Promise<UtilisateurType[]>
  createUser: (user: UtilisateurType) => Promise<UtilisateurType> | Promise<any>
  updateUser: (user: UtilisateurType) => Promise<any>
}

export const UseUtilisateurStore = create<UtilisateurState>(set => ({
  users: [],
  loading: false,
  error: '',

  fetchUsers: async () => {
    try {
      set({ loading: true })
      const { data } = await api.get('/utilisateur')

      const users = data

      set({ users })
      set({ loading: false })

      console.log('test data from the api :', data)

      return users
    } catch (error) {
      console.log(error)
      set({ loading: false, users: [] })
    }
  },

  createUser: async (user: UtilisateurType) => {
    try {
      set({ loading: true })
      const { data } = await api.post('utilisateur', user)

      console.log('user created :', data)

      if (data.status !== 400) {
        set({ loading: false })
        toast.success('User created successfully')
      } else {
        set({ loading: false })
        toast.error(data.message)
      }

      return data
    } catch (error: any) {
      set({ loading: false })
      toast.error(error?.message)

      return null
    }
  },
  updateUser: async (user: UtilisateurType) => {
    try {
      set({ loading: true })
      const { data } = await api.put('utilisateur', user)

      console.log('user updated :', data)

      set({ loading: false })
      toast.success('User updated successfully')

      return data
    } catch (error: any) {
      set({ loading: false })
      toast.error(error?.message || error.response.message || 'Unexpected error !')

      return null
    }
  }
}))
