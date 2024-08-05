// MUI Imports
import Grid from '@mui/material/Grid'

import type { UtilisateurType } from '@/types/userTypes'

import UserDetails from './UserDetails'

// Component Imports

const UserLeftOverview = ({ userData }: { userData: UtilisateurType }) => {
  console.log('we got the user from server :', userData)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserDetails userData={userData} />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export default UserLeftOverview
