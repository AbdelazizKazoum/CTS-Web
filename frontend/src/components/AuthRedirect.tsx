'use client'
import { redirect, usePathname } from 'next/navigation'

const AuthRedirect = () => {
  const pathname = usePathname()

  const redirectUrl = `/login?redirectTo=${pathname}`

  const homePage = '/home'
  const login = '/login'

  return redirect(pathname === 'login' ? login : pathname === homePage ? login : redirectUrl)
}

export default AuthRedirect
