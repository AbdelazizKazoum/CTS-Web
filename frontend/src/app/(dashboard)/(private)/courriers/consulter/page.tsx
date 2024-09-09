'use client'
/* eslint-disable import/no-unresolved */
import Index from '@/components/courriers/courrier_form/Index'
import viewCourrier from '@/components/courriers/view/view_courrier.hoc'

const ViewCourrierPage = viewCourrier(Index)

const Page = () => {
  return (
    <div>
      <ViewCourrierPage />
    </div>
  )
}

export default Page
