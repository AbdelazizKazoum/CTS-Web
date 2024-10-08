'use client'
/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */

import { useEffect, useState } from 'react'

// import { useRouter } from 'next/navigation'

// import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

import { useCourrierStore } from '@/store/courrier.store'

const editCourrier = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { getFile, document, selectedCourrier, loading, updateCourrier } = useCourrierStore()
    const [file, setFile] = useState<File | null>()

    //hooks
    const router = useRouter()

    useEffect(() => {
      ;(async () => {
        const res = await getFile(selectedCourrier?.filePath || '')
        console.log('res :', res)
        setFile(res)
      })()
    }, [getFile, selectedCourrier])

    //On submit :
    async function onSubmit(data: any) {
      if (file && selectedCourrier) {
        const formData = new FormData()

        formData.append('file', file, data.object)
        formData.append('formData', JSON.stringify(data))

        const res = await updateCourrier(selectedCourrier?.id || -1, formData)

        if (res) {
          router.push('/courriers')
        }
      } else toast.error('Vous avez besoin de télécharger un document')
    }

    return (
      <Component
        {...props}
        courrierFile={document}
        mode='edit'
        onSubmit={onSubmit}
        title='Modifier courrier'
        buttonText='Modfier le courrier'
        courrierData={selectedCourrier}
        file={file}
        setFile={setFile}
        loading={loading}
      />
    )
  }
}

export default editCourrier
