// MUI Imports
import { Card } from '@mui/material'

import Grid from '@mui/material/Grid'

import NoCompte from './NoCompte'

// Component Imports
import ChangePassword from './ChangePassword'
import ChangeRole from './ChangeRole'
import type { UtilisateurType } from '@/types/userTypes'

const SecurityTab = ({ userData }: { userData: UtilisateurType }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {userData.compte ? (
            <>
              <ChangeRole profile={userData.compte?.profile} />
              <ChangePassword />
            </>
          ) : (
            <NoCompte />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecurityTab
