/* eslint-disable import/no-unresolved */

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import { getSession } from 'next-auth/react'

import { BACKEND_API_URL } from '@/utils/constants'

const api = axios.create({
  baseURL: BACKEND_API_URL
})

api.interceptors.request.use(
  async config => {
    let session = null

    try {
      session = (await getSession()) || null
    } catch (error) {
      session = null
    }

    const token = session?.accessToken || ''

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    } as AxiosRequestHeaders

    return config
  },
  error => Promise.reject(error)
)

export default api
