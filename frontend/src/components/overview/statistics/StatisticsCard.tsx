'use client'
/* eslint-disable import/no-unresolved */
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

import { Skeleton } from '@mui/material'

import { useCourrierStore } from '@/store/courrier.store'

const StatisticsCard = () => {
  // Hooks
  const { loading, statistics } = useCourrierStore()

  return (
    <Card className={`h-full ${loading && 'shadow-none'}`}>
      {!loading ? (
        <>
          {' '}
          <CardHeader
            title='Total des Courriers par Direction'
            action={
              <Typography variant='subtitle2' color='text.disabled'>
                Statistiques Annuelles
              </Typography>
            }
          />
          <CardContent className='flex justify-between flex-wrap gap-4 md:pbs-10 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]'>
            <Grid container spacing={4}>
              {statistics.directionsStatistics.map((item: any, index: number) => (
                <Grid key={index} item xs className='flex items-center gap-4'>
                  <CustomAvatar color='primary' variant='rounded' size={40} skin='light'>
                    <i className='tabler-chart-pie-2'></i>
                  </CustomAvatar>
                  <div className='flex flex-col'>
                    <Typography variant='h5'>{item.count}</Typography>
                    <Typography variant='body2'>{item.nom}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </>
      ) : (
        <div className='  w-ful h-[200px]'>
          <Skeleton variant='rectangular' className='h-full' />
        </div>
      )}
    </Card>
  )
}

export default StatisticsCard
