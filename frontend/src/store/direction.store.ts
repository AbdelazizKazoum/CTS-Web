/* eslint-disable import/no-unresolved */
import { create } from 'zustand'

import type { DirectionType } from '@/types/directionType'

import api from '@/lib/api'
import { toast } from 'react-toastify'

interface DirectionState {
  directions: DirectionType[] | null
  loading: boolean
  status: string

  fetchDirections: () => Promise<DirectionType[]>
  createDirection: (direction: DirectionType) => Promise<DirectionType[]>
  updateDirection: (id: number, direction: DirectionType) => Promise<DirectionType[]>
}

export const useDirectionStore = create<DirectionState>(set => ({
  directions: null,
  loading: false,
  status: 'Idle',

  fetchDirections: async () => {
    try {
      set({ loading: true })
      const res = await api.get('/direction')

      const directions = res.data

      set({ directions })
      set({ loading: false })
      set({ status: 'fulfilled' })

      return directions
    } catch (error: any) {
      toast.error(error.message ? error.message : error.data.message)
      set({ status: 'rejected' })
    }
  },

  createDirection: async (direction: DirectionType) => {
    try {
      set({ loading: true })
      const res = await api.post('/direction', direction)

      set({ status: 'fulfilled' })

      toast.success('direction a été créée avec succès')
      return res.data
    } catch (error: any) {
      toast.error(error.data?.message ? error.data?.message : error.message)
    }
  },

  updateDirection: async (id: number, direction: DirectionType) => {
    try {
      set({ loading: true })
      const res = await api.patch(`/direction/${id}`, direction)

      set({ status: 'fulfilled' })

      toast.success('Direction a été modifier avec succès')
      console.log('res edit :', res)
      return res.data
    } catch (error: any) {
      toast.error(error.data?.message ? error.data?.message : error.message)
    }
  }
}))
