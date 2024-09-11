/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */
'use client'

// MUI Imports
import { useEffect } from 'react'

import { Card, Skeleton } from '@mui/material'

import Grid from '@mui/material/Grid'

import { useSession } from 'next-auth/react'

import NoCompte from './NoCompte'

// Component Imports
import ChangePassword from './ChangePassword'
import ChangeRole from './ChangeRole'
import type { UtilisateurType } from '@/types/userTypes'

import { useCompteStore } from '@/store/compte.store'

const SecurityTab = ({ userData }: { userData: UtilisateurType }) => {
  // Hooks
  const { updateCompte, loading, fetchProfiles, profiles } = useCompteStore()

  const { data: session } = useSession()

  useEffect(
    function () {
      ;(async () => {
        await fetchProfiles()
      })()
    },
    [fetchProfiles]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {userData.compte ? (
            <div className='h-full'>
              {!loading ? (
                <>
                  {session?.user.role === 'Administrateur' && (
                    <ChangeRole
                      profiles={profiles || []}
                      compte={userData.compte}
                      updateCompte={updateCompte}
                      loading={loading}
                    />
                  )}

                  <ChangePassword compte={userData.compte} updateCompte={updateCompte} loading={loading} />
                </>
              ) : (
                <div className='p-10'>
                  <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={40} />
                  <Skeleton animation='wave' height={60} className='mb-5' />

                  <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={40} />
                  <Skeleton animation={false} height={60} />
                </div>
              )}
            </div>
          ) : (
            <NoCompte />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecurityTab
