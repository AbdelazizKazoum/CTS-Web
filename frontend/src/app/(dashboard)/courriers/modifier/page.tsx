/* eslint-disable import/no-unresolved */
import Index from '@/components/courriers/courrier_form/Index'
import { editCourrier } from '@/components/courriers/edit/edit_courrier.hoc'

const EditCourrierPage = editCourrier(Index)

const Page = () => {
  return (
    <div>
      <EditCourrierPage />
    </div>
  )
}

export default Page
