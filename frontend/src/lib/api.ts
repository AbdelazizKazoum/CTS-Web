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

    console.log('test the session from the api call : ', session)

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

// /* eslint-disable import/no-unresolved */

// import axios from 'axios'

// import { getSession } from 'next-auth/react';

// import { BACKEND_API_URL } from '@/utils/constants'

// export default axios.create({
//   baseURL: BACKEND_API_URL,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Accept: 'application/json'
//   }
// })

// export const axiosAuth = axios.create({
//   baseURL: BACKEND_API_URL,

//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// })

// // axiosAuth.interceptors.request.use(
// //   config => {
// // console.log('session in the api config :', session)

// //     const token = session?.accessToken || ''

// //     config.headers = {
// //       Authorization: `Bearer ${token}`,
// //       Accept: 'application/json',
// //       'Content-Type': 'application/x-www-form-urlencoded'
// //     } as AxiosRequestHeaders

// //     return config
// //   },
// //   error => Promise.reject(error)
// // )
