/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

import { MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

import { toast } from 'react-toastify'

import DialogCloseButton from '../DialogCloseButton'
import { useProfileStore } from '@/store/profile.store'
import { UseUtilisateurStore } from '@/store/utilisateur.store'
import type { CompteType } from '@/types/userTypes'

// Component Imports

type CompteData = {
  profile?: string
  pass?: string
  confirmPassword: string
}

type CompteDataProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: CompteData
}

const initialCompteData: CompteDataProps['data'] = {
  profile: '',
  pass: '',
  confirmPassword: ''
}

const CreateCompte = ({ open, setOpen, data }: CompteDataProps) => {
  //store
  const { profileRoles, fetchProfileRoles } = useProfileStore()
  const { createCompte, selectedUser, getUserById } = UseUtilisateurStore()

  // States
  const [compteData, setCompteData] = useState(initialCompteData)

  const handleClose = () => {
    setOpen(false)
    setCompteData(initialCompteData)
  }

  useEffect(() => {
    setCompteData(data ?? initialCompteData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!profileRoles) {
      ;(async () => {
        await fetchProfileRoles()
      })()
    }
  }, [fetchProfileRoles, profileRoles])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (compteData.pass === compteData.confirmPassword && selectedUser?.id) {
      const compte = {
        pseudo: '',
        passe: compteData.pass,
        profile: profileRoles?.find(item => item.id == compteData.profile),
        utilisateur: selectedUser
      } as CompteType
      await createCompte(compte)
      getUserById(selectedUser.id)
      handleClose()
    } else {
      toast.error('le mot de passe ne correspond pas !')
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Edit Compte' : 'Créer un compte'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit your Compte' : 'Add card for future billing'}
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Rôle du profil'
                placeholder='Sélectionner un rôle'
                value={compteData?.profile}
                onChange={e => setCompteData({ ...compteData, profile: e.target.value as string })}
              >
                {profileRoles?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.libeleFunction}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='password'
                name='password'
                label='Mot de passe'
                autoComplete='off'
                placeholder=''
                value={compteData.pass}
                onChange={e => setCompteData({ ...compteData, pass: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CustomTextField
                fullWidth
                type='password'
                name='confirmPassword'
                autoComplete='off'
                label='Confirmer le mot de passe'
                placeholder=''
                value={compteData.confirmPassword}
                onChange={e => setCompteData({ ...compteData, confirmPassword: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            {data ? 'Modifier' : 'Enrigestrer'}
          </Button>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateCompte
