'use client'
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
import { useEffect } from 'react'

import { CircularProgress, Grid } from '@mui/material'

import { useCourrierStore } from '@/store/courrier.store'
import { CourriersList } from './CourriersList'

const Index = () => {
  const { fetchCourriers, courriers } = useCourrierStore()

  useEffect(() => {
    ;(async () => {
      await fetchCourriers()
    })()
  }, [fetchCourriers])

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} className=''>
          {courriers ? (
            <CourriersList tableData={courriers} />
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
