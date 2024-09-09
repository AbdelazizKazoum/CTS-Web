'use client'

import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { axiosAuth } from '../api'

const useAxiosAuth = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${session?.accessToken} `
        }

        return config
      },
      error => Promise.reject(error)
    )

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept)
    }
  }, [session])

  return axiosAuth
}

export default useAxiosAuth
