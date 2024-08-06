/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/default */

// eslint-disable-next-line import/no-unresolved

import { Button } from '@mui/material'

import type { ButtonProps } from '@mui/material/Button'

import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import CreateCompte from '@/components/dialogs/user/CreateCompte'

const NoCompte = () => {
  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Créer un Compte'
  }

  return (
    <div className='bg-white p-6 rounded-lg ax-w-sm w-full'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Compte Non Trouvé</h2>
      <p className='text-gray-600 mb-6'>
        Cet utilisateur n'a pas de compte associé. Veuillez créer un compte pour lui afin de continuer.
      </p>
      <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={CreateCompte} />
    </div>
  )
}

export default NoCompte
