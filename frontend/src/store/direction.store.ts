import { create } from 'zustand'

import type { DirectionType } from '@/types/directionType'

import api from '@/lib/api'

interface DirectionState {
  directions: DirectionType[] | null
  loading: boolean
  error: string

  fetchDirections: () => Promise<DirectionType[]>
}

export const useDirectionStore = create<DirectionState>(set => ({
  directions: null,
  loading: false,
  error: '',

  fetchDirections: async () => {
    try {
      set({ loading: true })
      const res = await api.get('/direction')

      const directions = res.data

      set({ directions })
      set({ loading: false })

      return directions
    } catch (error: any) {
      set({ error: error.message ? error.message : error.data.message })
    }
  }
}))
