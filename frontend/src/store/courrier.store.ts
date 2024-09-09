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
  document: File | null

  fetchCourriers: () => Promise<CourrierType[]>
  createCourrier: (courrier: any) => Promise<CourrierType>
  updateCourrier: (idCourrier: number, courrier: any) => Promise<CourrierType>
  getCourrier: (id: number) => Promise<CourrierType>
  getFile: (filePath: string) => Promise<File | null>
  setSelectedCourrier: (courrier: CourrierType) => void
}

export const useCourrierStore = create<CourrierStateType>(set => ({
  courriers: null,
  status: 'Idle',
  loading: false,
  selectedCourrier: null,
  document: null,

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

  //  Creat courrier
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

  // Creat courrier
  updateCourrier: async (idCourrier: number, courrier: CourrierType) => {
    try {
      set({ loading: true })

      const res = await api.patch(`/courrier/${idCourrier}`, courrier)

      set({ status: 'success' })
      toast.success('Le courrier a été modifier avec succès ')

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

      // const url = window.URL.createObjectURL(new Blob([res.data]))

      // GENERATE FILES :
      const blob = new Blob([res.data])

      const file = new File([blob], filePath.split('-')[0], {
        type: 'application/pdf',
        lastModified: 1723730753678 // Set the desired lastModified timestamp
      })

      set({ status: 'success' })
      set({ document: file })

      console.log(' generate file api :', file)

      return file
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
