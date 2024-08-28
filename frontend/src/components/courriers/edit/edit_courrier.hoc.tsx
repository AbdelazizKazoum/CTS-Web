'use client'
/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */

import { useEffect, useState } from 'react'

// import { useRouter } from 'next/navigation'

// import { toast } from 'react-toastify'

import { useCourrierStore } from '@/store/courrier.store'

export const editCourrier = (Component: any) => {
  return (props: any) => {
    const { getFile, document, selectedCourrier, loading } = useCourrierStore()
    const [file, setFile] = useState<File | null>()

    //hooks
    // const router = useRouter()

    useEffect(() => {
      ;(async () => {
        await getFile(selectedCourrier?.filePath || '')
      })()
    })

    //On submit :
    async function onSubmit(data: any) {
      if (file) {
        const formData = new FormData()

        console.log('data :', data)

        formData.append('file', file, data.object)
        formData.append('formData', JSON.stringify(data))

        console.log('data :', data)
        console.log('file :', file)
        console.log('form data :', formData)

        // const res = await createCourrier(formData)

        //   if (res) {
        //     router.push('/courriers')
        //     console.log(res)
        //   }
        // } else toast.error('Vous avez besoin de télécharger un document')
      }
    }

    return (
      <Component
        {...props}
        courrierFile={document}
        mode='edit'
        onSubmit={onSubmit}
        buttonText='Modfier le courrier'
        courrierData={selectedCourrier}
        file={file}
        setFile={setFile}
        loading={loading}
      />
    )
  }
}
