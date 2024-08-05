/* eslint-disable import/no-unresolved */
// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import UserLeftOverview from '@/components/users/view/user-left/UserLeft'

import UserRight from '@/components/users/view/user-right/UserRight'
import api from '@/lib/api'

const SecurityTab = dynamic(() => import('@/components/users/view/user-right/profile-security'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  security: <SecurityTab />
})

const getUserData = async (id: number) => {
  const res = await api.get(`/utilisateur/${id}`)

  if (res.error) {
    throw new Error('error happend')
  }
}

const UserViewTab = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getUserData(params.id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview userData={data} />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        {/* <UserRight tabContentList={tabContentList(data)} /> */}
        <UserRight tabContentList={tabContentList()} />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
