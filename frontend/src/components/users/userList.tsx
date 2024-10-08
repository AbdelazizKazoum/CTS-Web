/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */
'use client'
import { useEffect } from 'react'

import { CircularProgress, Grid } from '@mui/material'

import { Table } from './table'

import { UseUtilisateurStore } from '@/store/utilisateur.store'

const UserList = () => {
  const { users } = UseUtilisateurStore()
  const { fetchUsers } = UseUtilisateurStore()

  useEffect(() => {
    ;(async () => {
      await fetchUsers()
    })()
  }, [fetchUsers])

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} className=''>
          {users && users?.length > 0 ? (
            <Table tableData={users} />
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

export default UserList
