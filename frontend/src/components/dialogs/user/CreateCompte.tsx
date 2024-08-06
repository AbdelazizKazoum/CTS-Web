/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import { MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

import DialogCloseButton from '../DialogCloseButton'

// Component Imports

type BillingCardData = {
  profile?: string
  password?: string
  confirmPassword: string
}

type BillingCardProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: BillingCardData
}

const initialCardData: BillingCardProps['data'] = {
  profile: '',
  password: '',
  confirmPassword: ''
}

const CreateCompte = ({ open, setOpen, data }: BillingCardProps) => {
  // States
  const [cardData, setCardData] = useState(initialCardData)

  const handleClose = () => {
    setOpen(false)
    setCardData(initialCardData)
  }

  useEffect(() => {
    setCardData(data ?? initialCardData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Edit Card' : 'Create Compte'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit your saved card details' : 'Add card for future billing'}
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Profile'
                value={cardData?.profile}
                onChange={e => setCardData({ ...cardData, profile: e.target.value as string })}
              >
                <MenuItem value='Administrateur'>Administrateur</MenuItem>
                <MenuItem value='Secretariat'>Secretariat</MenuItem>
                <MenuItem value='Utilisateur'>Utilisateur</MenuItem>{' '}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                name='password'
                label='Name on Card'
                autoComplete='off'
                placeholder='John Doe'
                value={cardData.password}
                onChange={e => setCardData({ ...cardData, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <CustomTextField
                fullWidth
                name='expiry'
                autoComplete='off'
                label='Expiry'
                placeholder='MM/YY'
                value={cardData.confirmPassword}
                onChange={e => setCardData({ ...cardData, confirmPassword: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel control={<Switch defaultChecked />} label='Save Card for future billing?' />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' onClick={handleClose}>
            {data ? 'Update' : 'Submit'}
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
