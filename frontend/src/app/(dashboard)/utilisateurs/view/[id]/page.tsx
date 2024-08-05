/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { useEffect, type ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import UserLeftOverview from '@/components/users/view/user-left/UserLeft'

import UserRight from '@/components/users/view/user-right/UserRight'
import api from '@/lib/api'
import { UseUtilisateurStore } from '@/store/utilisateur.store'

const SecurityTab = dynamic(() => import('@/components/users/view/user-right/profile-security'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  security: <SecurityTab />
})

const UserViewTab = ({ params }: { params: { id: number } }) => {

  const { getUserById } = UseUtilisateurStore()


  useEffect(()=>{

    ( async()=>{
      const user =

    } )()

  })

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
