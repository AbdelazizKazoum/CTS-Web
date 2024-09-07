'use client'

import { SessionProvider, useSession } from 'next-auth/react'

export default function Page() {
  const session = useSession()

  return (
    <SessionProvider>
      <h1>{session.user?.id}</h1>
    </SessionProvider>
  )
}
