/* eslint-disable import/no-unresolved */
'use client'
import { Card, Grid, Skeleton } from '@mui/material'

import BarChartCountCourriers from './BarChartCountCourriers'
import { useCourrierStore } from '@/store/courrier.store'

const CountCourriersByTypes = () => {
  const { statistics, loading } = useCourrierStore()

  return (
    <>
      {!loading ? (
        <>
          {' '}
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <BarChartCountCourriers title='Courriers Externes' stats={statistics.statisticsByType.externe} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <BarChartCountCourriers title='Courriers Internes' stats={statistics.statisticsByType.interne} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <BarChartCountCourriers title='Courriers Sortants' stats={statistics.statisticsByType.sortant} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <BarChartCountCourriers title='Courriers Entrants' stats={statistics.statisticsByType.entrant} />
          </Grid>
        </>
      ) : (
        <>
          {[0, 1, 2, 3].map((item, index) => (
            <Grid key={index} item xs={12} md={3}>
              <Card className={`h-full ${loading && 'shadow-none'}`}>
                <div className='w-ful h-[200px]'>
                  <Skeleton variant='rectangular' className='h-full' />
                </div>
              </Card>{' '}
            </Grid>
          ))}
        </>
      )}
    </>
  )
}

export default CountCourriersByTypes
