/* eslint-disable import/no-unresolved */
import { Button, CardContent, CardHeader, MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import type { ProfileType } from '@/types/userTypes'

const ChangeRole = ({ profile }: { profile: ProfileType }) => {
  return (
    <>
      <CardHeader title='Change Role' />{' '}
      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-end gap-4 flex-col sm:flex-row'>
          <CustomTextField
            select
            fullWidth
            label='Choose Plan'
            defaultValue={profile.libeleFunction}
            id='user-view-plans-select'
          >
            <MenuItem value='Administrateur'>Administrateur</MenuItem>
            <MenuItem value='Secretariat'>Secretariat</MenuItem>
            <MenuItem value='Utilisateur'>Utilisateur</MenuItem>
          </CustomTextField>
          <Button variant='contained' className='capitalize sm:is-auto is-full'>
            Upgrade
          </Button>
        </div>
      </CardContent>
    </>
  )
}

export default ChangeRole
