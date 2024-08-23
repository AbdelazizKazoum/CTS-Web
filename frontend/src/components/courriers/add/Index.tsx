/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
// MUI Imports
'use client'
import CourrierHeader from '@/components/courriers/add/CourrierHeader'
import CourrierInformation from '@/components/courriers/add/CourrierInformation'
import CourrierUploads from '@/components/courriers/add/CourrierUploads'
import { useCourrierStore } from '@/store/courrier.store'
import type { CourrierType } from '@/types/courrierTypes'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Index = () => {
  const [file, setFile] = useState<File | null>()

  const { createCourrier } = useCourrierStore()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CourrierType>()

  async function onSubmit(data: any) {
    if (file) {
      const formData = new FormData()

      formData.append('file', file, data.object)
      formData.append('formData', JSON.stringify(data))

      console.log('form data :', formData)
      const res = await createCourrier(formData)

      console.log('res :', res)
    } else console.log('you must upload a document')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourrierHeader />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CourrierInformation onSubmit={onSubmit} handleSubmit={handleSubmit} control={control} errors={errors} />
          </Grid>
          {/* <Grid item xs={12}></Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            <CourrierUploads file={file} setFile={setFile} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
