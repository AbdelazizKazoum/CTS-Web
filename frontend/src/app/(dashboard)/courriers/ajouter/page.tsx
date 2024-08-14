/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
// MUI Imports
import CourrierHeader from '@/components/courriers/add/CourrierHeader'
import CourrierInformation from '@/components/courriers/add/CourrierInformation'
import CourrierUploads from '@/components/courriers/add/CourrierUploads'
import Grid from '@mui/material/Grid'

// Component Imports

const Page = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourrierHeader />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CourrierInformation />
          </Grid>
          <Grid item xs={12}>
            <CourrierUploads />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}></Grid>
      </Grid>
    </Grid>
  )
}

export default Page
