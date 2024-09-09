/* eslint-disable import/no-unresolved */
import { redirect } from 'next/navigation'

import type { ChildrenType } from '@/@core/types'

import { auth } from '@/lib/auth'

const GuestOnlyRoute = async ({ children }: ChildrenType) => {
  const session = await auth()

  if (session) {
    redirect('/home')
  }

  return <>{children}</>
}

export default GuestOnlyRoute
