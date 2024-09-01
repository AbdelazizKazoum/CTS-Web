'use client'
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
import { useEffect } from 'react'

import { CircularProgress, Grid } from '@mui/material'

import { DirectionsList } from './DirectionsList'
import { useDirectionStore } from '@/store/direction.store'

const Index = () => {
  const { fetchDirections, directions } = useDirectionStore()

  useEffect(() => {
    ;(async () => {
      await fetchDirections()
    })()
  }, [fetchDirections])

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} className=''>
          {directions ? (
            <DirectionsList tableData={directions} />
          ) : (
            <div className=' h-full w-full flex justify-center items-center  '>
              <CircularProgress className=' mt-32 ' />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Index
