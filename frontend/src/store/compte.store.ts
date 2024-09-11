/* eslint-disable import/no-unresolved */
import { toast } from 'react-toastify'

import { create } from 'zustand'

import api from '@/lib/api'

import type { CompteType, ProfileType, UtilisateurType } from '@/types/userTypes'

interface CompteStateType {
  userData: UtilisateurType | null
  profiles: ProfileType[] | null
  status: string
  loading: boolean

  fetchProfiles: () => Promise<ProfileType[]>
  updateCompte: (comteData?: CompteType | null) => Promise<string>
}

export const useCompteStore = create<CompteStateType>(set => ({
  userData: null,
  profiles: null,
  status: 'Idle',
  loading: false,

  updateCompte: async (compteData?: CompteType | null) => {
    try {
      const res = await api.patch(`/compte/${compteData?.id}`, compteData)

      set({ status: 'fulfilled' })

      toast.success('Compte a été modifier avec succès')

      return res.data
    } catch (error: any) {
      toast.error(error.response ? error.response.data.message : error.message ? error.message : error.data?.message)

      return null
    } finally {
    }
  },

  fetchProfiles: async () => {
    try {
      set({ loading: true })
      const res = await api.get(`/profile/`)

      set({ status: 'fulfilled' })
      set({ profiles: res.data })

      return res.data
    } catch (error: any) {
      toast.error(error.response ? error.response.data.message : error.message ? error.message : error.data?.message)

      return null
    } finally {
      set({ loading: false })
    }
  }
}))
