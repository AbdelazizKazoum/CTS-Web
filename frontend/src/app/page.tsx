/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
// Next Imports
import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()

  if (session) {
    return redirect('/home')
  }

  return redirect('/login')
}
