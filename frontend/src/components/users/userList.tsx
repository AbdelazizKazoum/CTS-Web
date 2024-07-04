import { Grid } from '@mui/material'

import type { UtilisateurType } from '@/types/userTypes'
import { Table } from './table'

const UserList = ({ data }: { data: UtilisateurType[] }) => {
  console.log(data)

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Table data={data} />
        </Grid>
      </Grid>
    </div>
  )
}

export default UserList
