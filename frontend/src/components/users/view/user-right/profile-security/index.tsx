// MUI Imports
import { Card } from '@mui/material'

import Grid from '@mui/material/Grid'

// Component Imports
import ChangePassword from './ChangePassword'
import ChangeRole from './ChangeRole'

const SecurityTab = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <ChangeRole />
          <ChangePassword />
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecurityTab
