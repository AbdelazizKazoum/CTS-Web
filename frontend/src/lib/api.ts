/* eslint-disable import/no-unresolved */

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import { BACKEND_API_URL } from '@/utils/constants'
import { auth } from './auth'

console.log('call this api : ', BACKEND_API_URL)

const api = axios.create({
  baseURL: BACKEND_API_URL
})

api.interceptors.request.use(
  async config => {
    const session = await auth()
    // console.log('session in the api config :', session)

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
