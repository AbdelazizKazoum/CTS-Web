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
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Index = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [file, setFile] = useState<File | null>()

  const { createCourrier, loading } = useCourrierStore()

  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CourrierType>()

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

  async function onSubmit(data: any) {
    if (file) {
      const formData = new FormData()

      console.log('data :', data)

      formData.append('file', file, data.object)
      formData.append('formData', JSON.stringify(data))

      const res = await createCourrier(formData)

      if (res) {
        router.push('/courriers')
        console.log(res)
      }
    } else toast.error('Vous avez besoin de télécharger un document')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourrierHeader loading={loading} submitFormClick={submitFormClick} />
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
