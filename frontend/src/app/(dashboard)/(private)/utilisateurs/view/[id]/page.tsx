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
  const { getUserById, selectedUser, loading, error } = UseUtilisateurStore()

  useEffect(() => {
    ;(async () => {
      await getUserById(params.id)
    })()
  }, [getUserById, params.id])

  return (
    <Grid className='h-full' container spacing={6}>
      {!loading ? (
        <>
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
            <div className='flex flex-col gap-3 justify-center items-center  w-full h-full text-2xl '>
              <i className='tabler-alert-circle text-red-600 text-2xl ' />
              {error ? error : 'Non trouvé'}
            </div>
          )}
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
