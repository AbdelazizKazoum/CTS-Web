/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
// MUI Imports

import RecentCourriers from '@/components/overview/RecentCourriers'
import RecievedCourriers from '@/components/overview/RecievedCourriers '
import BarChartCountCourriers from '@/components/overview/statistics/BarChartCountCourriers'
import CourriesTotalCount from '@/components/overview/statistics/CourriesTotalCount'
import StatisticsCard from '@/components/overview/statistics/StatisticsCard'
import Grid from '@mui/material/Grid'

// Component Imports

const Page = () => {
  // Vars

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <CourriesTotalCount />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid>

      <Grid item xs={12} md={6} lg={6} xl={3}>
        <BarChartCountCourriers title='Courriers Externes' frequency='Rapport Mensuel' />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={3}>
        <BarChartCountCourriers title='Courriers Internes' frequency='Rapport Mensuel' />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={3}>
        <BarChartCountCourriers title='Courriers Sortants' frequency='Rapport Mensuel' />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={3}>
        <BarChartCountCourriers title='Courriers Entrants' frequency='Rapport Mensuel' />
      </Grid>
      <Grid item xs={12} sm={6} lg={6}>
        <RecentCourriers />
      </Grid>
      <Grid item xs={12} sm={6} lg={6}>
        <RecievedCourriers />
      </Grid>
    </Grid>
  )
}

export default Page
