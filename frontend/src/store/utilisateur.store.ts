import { create } from 'zustand'

// eslint-disable-next-line import/no-unresolved
import api from '@/lib/api'

import type { UtilisateurType } from '@/types/userTypes'

export interface UtilisateurState {
  users: UtilisateurType[] | null

  fetchUsers: () => Promise<UtilisateurType[]>
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
  }
}))
