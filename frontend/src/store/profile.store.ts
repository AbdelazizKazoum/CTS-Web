import api from '@/lib/api'
import { ProfileType } from '@/types/userTypes'
import { toast } from 'react-toastify'
import { create } from 'zustand'

interface ProfileState {
  profileRoles: ProfileType[] | null
  error: string
  loading: boolean

  fetchProfileRoles: () => Promise<ProfileType[]>
}

export const useProfileStore = create<ProfileState>(set => ({
  profileRoles: null,
  error: '',
  loading: false,

  fetchProfileRoles: async () => {
    try {
      set({ loading: true })

      const { data } = await api.get('/profile')

      set({ profileRoles: data })

      set({ loading: false })

      return data
    } catch (error: any) {
      set({ error: error.message ? error.message : error.data.message })
      toast.error(error.message ? error.message : error.data.message)

      return error
    }
  }
}))
