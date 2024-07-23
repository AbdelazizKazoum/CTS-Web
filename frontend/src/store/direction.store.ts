import { create } from 'zustand'

import type { DirectionType } from '@/types/directionType'

import api from '@/lib/api'

interface DirectionState {
  directions: [] | null

  fetchDirections: () => Promise<DirectionType[]>
}

export const useDirectionStore = create<DirectionState>(set => ({
  directions: null,

  fetchDirections: async () => {
    try {
      const res = await api.get('/direction')

      const directions = res.data

      set({ directions })

      return directions
    } catch (error) {}
  }
}))
