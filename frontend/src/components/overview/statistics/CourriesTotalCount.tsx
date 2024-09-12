'use client'

// MUI Imports

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// eslint-disable-next-line import/no-unresolved
import { Skeleton } from '@mui/material'

// eslint-disable-next-line import/no-unresolved
import { useCourrierStore } from '@/store/courrier.store'

const CourriesTotalCount = () => {
  // hooks
  const router = useRouter()
  const { statistics, loading, getStatistics } = useCourrierStore()

  useEffect(() => {
    // eslint-disable-next-line padding-line-between-statements
    ;(async () => {
      await getStatistics()
    })()
  }, [getStatistics])

  return (
    <Card className={`h-full ${loading && 'shadow-none'}`}>
      {!loading ? (
        <Grid container>
          {' '}
          <Grid item xs={8}>
            <CardContent>
              <Typography variant='h5' className='mbe-0.8'>
                Total des Courriers
              </Typography>
              <Typography variant='subtitle1' className='mbe-2'>
                Total des Courriers Créés au Cours de la Dernière Année
              </Typography>
              <Typography variant='h4' color='primary.main' className='mbe-1'>
                {statistics.totalCourriers}
              </Typography>
              <Button onClick={() => router.push('/courriers')} variant='contained' color='primary'>
                Afficher les Courriers{' '}
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      ) : (
        <div className='w-ful h-full'>
          <Skeleton variant='rectangular' className='h-full' />
        </div>
      )}
    </Card>
  )
}

export default CourriesTotalCount
