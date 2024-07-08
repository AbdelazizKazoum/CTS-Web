/* eslint-disable padding-line-between-statements */

import { useEffect } from 'react'

import { Grid } from '@mui/material'

import type { UtilisateurType } from '@/types/userTypes'
import { Table } from './table'

import { UseUtilisateurStore } from '@/store/utilisateur.store'

const UserList = ({ data }: { data: UtilisateurType[] }) => {
  const { users } = UseUtilisateurStore()
  const { fetchUsers } = UseUtilisateurStore()

  useEffect(() => {
    ;(async () => {
      await fetchUsers()
    })()
  }, [fetchUsers])

  console.log('test tes :', users)

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          {users?.length > 0 ? <Table tableData={users} /> : 'loading ...'}
        </Grid>
      </Grid>
    </div>
  )
}

export default UserList
