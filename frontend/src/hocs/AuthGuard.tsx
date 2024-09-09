/* eslint-disable import/no-unresolved */
import type { ChildrenType } from '@/@core/types'
import AuthRedirect from '@/components/AuthRedirect'
import { auth } from '@/lib/auth'

const AuthGuard = async ({ children }: ChildrenType) => {
  const session = await auth()

  return <>{session ? children : <AuthRedirect />}</>
}

export default AuthGuard
