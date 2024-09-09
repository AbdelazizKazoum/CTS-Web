'use client'
/* eslint-disable import/no-unresolved */
// Component Imports

import newCourrier from '@/components/courriers/add/new_courrier.hoc'
import Index from '@/components/courriers/courrier_form/Index'

const NewCourrierPage = newCourrier(Index)

const Page = () => {
  return (
    <div>
      <NewCourrierPage />
    </div>
  )
}

export default Page
