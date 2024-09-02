/* eslint-disable import/no-unresolved */
import { useState } from 'react'

import { Button, CardContent, CardHeader, MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

import type { CompteType, ProfileType } from '@/types/userTypes'

const ChangeRole = ({
  compte,
  updateCompte,
  profiles
}: {
  compte: CompteType
  profiles: ProfileType[]
  updateCompte: (comteData: CompteType) => Promise<any>
  loading: boolean
}) => {
  //state
  const [profile, setProfile] = useState<string | number>()
  const [sending, setSending] = useState<boolean>(false)

  async function updateProfile() {
    if (compte.profile && profile && profiles) {
      setSending(true)
      const res = await updateCompte({ ...compte, profile: profiles.find(item => item.id === profile) || null })

      if (res) {
        console.log('sucess')
      }

      setSending(false)
    }
  }

  return (
    <>
      <CardHeader title='Change Role' />{' '}
      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-end gap-4 flex-col sm:flex-row'>
          <CustomTextField
            select
            fullWidth
            label='Choisir la fonction'
            defaultValue={compte?.profile?.id}
            id='user-view-plans-select'
            value={profile}
            onChange={e => setProfile(e.target.value)}
          >
            {profiles.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.libeleFunction}
              </MenuItem>
            ))}
          </CustomTextField>
          <Button
            disabled={sending}
            onClick={updateProfile}
            variant='contained'
            className='capitalize sm:is-auto is-full'
          >
            {sending ? 'loading...' : 'Modifier'}
          </Button>
        </div>
      </CardContent>
    </>
  )
}

export default ChangeRole
