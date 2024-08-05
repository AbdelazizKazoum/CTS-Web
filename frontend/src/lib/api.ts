/* eslint-disable import/no-unresolved */
'use client'

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import { BACKEND_API_URL } from '@/utils/constants'

console.log('call this api : ', BACKEND_API_URL)

const api = axios.create({
  baseURL: BACKEND_API_URL
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

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
