'use client'
/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */

import { useState } from 'react'

// import { useRouter } from 'next/navigation'

// import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

import { useCourrierStore } from '@/store/courrier.store'

const newCourrier = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { document, createCourrier, loading } = useCourrierStore()
    const [file, setFile] = useState<File | null>()

    //hooks
    const router = useRouter()

    //On submit :
    async function onSubmit(data: any) {
      if (file) {
        const formData = new FormData()

        formData.append('file', file, data.object)
        formData.append('formData', JSON.stringify(data))

        const res = await createCourrier(formData)

        if (res) {
          router.push('/courriers')
        }
      } else toast.error('Vous avez besoin de télécharger un document')
    }

    return (
      <Component
        {...props}
        courrierFile={document}
        mode='new'
        onSubmit={onSubmit}
        buttonText='Ajouter nouveau courrier'
        title='Nouveau courrier'
        courrierData={{}}
        file={file}
        setFile={setFile}
        loading={loading}
      />
    )
  }
}

export default newCourrier
