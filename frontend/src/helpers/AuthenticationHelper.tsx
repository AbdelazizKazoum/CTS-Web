/* eslint-disable import/no-unresolved */
'use client'

import { redirect } from 'next/navigation'

import { UseAuthStore } from '@/store/auth.store'

const AuthenticationHelper = () => {
  const { authData } = UseAuthStore()

  if (!authData?.access_token) redirect('/login')
  else redirect('/home')
}

export default AuthenticationHelper
