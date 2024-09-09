'use client'
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
import { useEffect } from 'react'

import { CircularProgress, Grid } from '@mui/material'

import { useSession } from 'next-auth/react'

import { useCourrierStore } from '@/store/courrier.store'
import { CourriersList } from './CourriersList'
import { useDirectionStore } from '@/store/direction.store'

import { UseUtilisateurStore } from '@/store/utilisateur.store'

const Index = () => {
  const { fetchCourriers, courriers } = useCourrierStore()
  const { fetchDirections } = useDirectionStore()
  const { fetchUsers } = UseUtilisateurStore()

  //auth
  const { data: session } = useSession()

  useEffect(() => {
    ;(async () => {
      await fetchDirections()
      await fetchCourriers()
      if (session?.user?.role === 'Administrateur') {
        await fetchUsers()
      }
    })()
  }, [fetchCourriers, fetchDirections, fetchUsers, session?.user?.role])

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} className=''>
          {courriers ? (
            <CourriersList tableData={courriers} />
          ) : (
            <div className=' h-full w-full flex justify-center items-center  '>
              <CircularProgress className=' mt-32 ' />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Index
