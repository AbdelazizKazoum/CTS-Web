/* eslint-disable import/no-unresolved */
/* eslint-disable padding-line-between-statements */

import { useEffect } from 'react'

import { useCourrierStore } from '@/store/courrier.store'

export const editCourrier = (Component: any, courrierFilePath: string) => {
  return (props: any) => {
    const { getFile, document, selectedCourrier, loading, createCourrier } = useCourrierStore()

    useEffect(() => {
      ;(async () => {
        await getFile(courrierFilePath)
      })()
    })

    return <Component {...props} courrierFile={document} mode='edit' courrier={selectedCourrier} />
  }
}
