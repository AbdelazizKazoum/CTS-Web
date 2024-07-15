// Next Imports
import { redirect } from 'next/navigation'

import AuthenticationHelper from '@/helpers/AuthenticationHelper'

export default function Page() {
  return (
    <>
      <AuthenticationHelper />
    </>
  )

  redirect('/home')
}
