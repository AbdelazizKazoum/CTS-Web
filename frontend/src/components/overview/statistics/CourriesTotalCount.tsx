'use client'

// MUI Imports

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const CourriesTotalCount = () => {
  const router = useRouter()

  return (
    <Card>
      <Grid container>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.8'>
              Total des Courriers
            </Typography>
            <Typography variant='subtitle1' className='mbe-2'>
              Total des Courriers Créés au Cours de la Dernière Année
            </Typography>
            <Typography variant='h4' color='primary.main' className='mbe-1'>
              124
            </Typography>

            <Button onClick={() => router.push('/courriers')} variant='contained' color='primary'>
              Afficher les Courriers{' '}
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CourriesTotalCount
