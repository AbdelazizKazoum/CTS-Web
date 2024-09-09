/* eslint-disable import/no-unresolved */
// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

import GuestOnlyRoute from '@/hocs/GuestOnlyRoute'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <GuestOnlyRoute>
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </GuestOnlyRoute>
    </Providers>
  )
}

export default Layout
