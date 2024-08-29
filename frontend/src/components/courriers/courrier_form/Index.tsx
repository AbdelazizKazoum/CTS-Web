/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
// MUI Imports
'use client'
import CourrierHeader from '@/components/courriers/add/CourrierHeader'
import CourrierInformation from '@/components/courriers/add/CourrierInformation'
import CourrierUploads from '@/components/courriers/add/CourrierUploads'
import type { CourrierType } from '@/types/courrierTypes'
import Grid from '@mui/material/Grid'
import type { Dispatch, SetStateAction } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

const Index = ({
  onSubmit,
  buttonText,
  title,
  file,
  setFile,
  loading,
  courrierData,
  courrierFile
}: {
  onSubmit: () => void
  buttonText: string
  title: string
  file: File | null
  setFile: Dispatch<SetStateAction<File | null | undefined>>
  loading: boolean
  courrierData: CourrierType
  courrierFile: string
}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CourrierType>({
    defaultValues: courrierData
  })

  function submitFormClick() {
    if (formRef.current) {
      // Prevent the default form submission
      const event = new Event('submit', { cancelable: true, bubbles: true })

      if (formRef.current.dispatchEvent(event)) {
        // Submit the form programmatically
        formRef.current.submit()
      }
    }
  }

  // console.log('courrierFile :', courrierFile)
  // console.log('file :', file)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourrierHeader buttonText={buttonText} title={title} loading={loading} submitFormClick={submitFormClick} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CourrierInformation
              formRef={formRef}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              control={control}
              errors={errors}
            />
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
