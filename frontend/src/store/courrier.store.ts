/* eslint-disable import/no-unresolved */
import { create } from 'zustand'

import { toast } from 'react-toastify'

import api from '@/lib/api'

import type { CourrierType } from '@/types/courrierTypes'

interface CourrierStateType {
  courriers: CourrierType[] | null
  status: string
  loading: boolean
  selectedCourrier: CourrierType | null
  document: string

  fetchCourriers: () => Promise<CourrierType[]>
  createCourrier: (courrier: any) => Promise<CourrierType>
  getCourrier: (id: number) => Promise<CourrierType>
  getFile: (filePath: string) => Promise<string>
  setSelectedCourrier: (courrier: CourrierType) => void
}

export const useCourrierStore = create<CourrierStateType>(set => ({
  courriers: null,
  status: 'idle',
  loading: false,
  selectedCourrier: null,
  document: '',

  fetchCourriers: async () => {
    try {
      set({ loading: true })
      const res = await api.get('/courrier')

      set({ courriers: res.data })
      set({ status: 'success' })

      console.log('test data from api :', res)

      return res.data
    } catch (error: any) {
      set({ status: 'rejected' })
      set({ courriers: [] })
      toast.error(error.message ? error.message : error.data.message)

      return null
    } finally {
      set({ loading: false })
    }
  },
  createCourrier: async (courrier: CourrierType) => {
    try {
      set({ loading: true })
      const res = await api.post('/courrier', courrier)

      set({ status: 'success' })
      toast.success('Le courrier a été enregistré avec succès ')

      return res.data
    } catch (error: any) {
      set({ status: 'rejected' })
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message ? error.message : error.data?.message)

      return null
    } finally {
      set({ loading: false })
    }
  },

  getCourrier: async (id: number) => {
    try {
      set({ loading: true })
      const res = await api.get(`/courrier/${id}`)

      set({ status: 'success' })
      set({ selectedCourrier: res.data })

      return res.data
    } catch (error: any) {
      set({ status: 'rejected' })
      toast.error(error.message ? error.message : error.data.message)

      return null
    } finally {
      set({ loading: false })
    }
  },

  getFile: async (filePath: string) => {
    try {
      set({ loading: true })

      const res = await api.get(`/courrier/file/${filePath}`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))

      set({ status: 'success' })
      set({ document: url })

      return res.data
    } catch (error: any) {
      set({ status: 'rejected' })
      toast.error(error.message ? error.message : error.data.message)

      return null
    } finally {
      set({ loading: false })
    }
  },

  setSelectedCourrier: async (courrier: CourrierType) => {
    set({ selectedCourrier: courrier })
  }
}))
