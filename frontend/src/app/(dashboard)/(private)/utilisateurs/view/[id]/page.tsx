/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { useEffect, type ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import UserLeftOverview from '@/components/users/view/user-left/UserLeft'

import UserRight from '@/components/users/view/user-right/UserRight'

import { UseUtilisateurStore } from '@/store/utilisateur.store'
import type { UtilisateurType } from '@/types/userTypes'

const SecurityTab = dynamic(() => import('@/components/users/view/user-right/profile-security'))

// Vars
const tabContentList = (userData: UtilisateurType): { [key: string]: ReactElement } => ({
  security: <SecurityTab userData={userData} />
})

const UserViewTab = ({ params }: { params: { id: number } }) => {
  const { getUserById, selectedUser } = UseUtilisateurStore()

  useEffect(() => {
    ;(async () => {
      await getUserById(params.id)
    })()
  }, [getUserById, params.id])

  return (
    <Grid container spacing={6}>
      {selectedUser ? (
        <>
          {' '}
          <Grid item xs={12} lg={4} md={5}>
            <UserLeftOverview userData={selectedUser} />
          </Grid>
          <Grid item xs={12} lg={8} md={7}>
            {/* <UserRight tabContentList={tabContentList(data)} /> */}
            <UserRight tabContentList={tabContentList(selectedUser)} />
          </Grid>
        </>
      ) : (
        <div className=' flex justify-center w-full h-full '>
          <CircularProgress className=' mt-32 ' />
        </div>
      )}
    </Grid>
  )
}

export default UserViewTab
