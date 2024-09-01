/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { Dispatch, SetStateAction, useEffect, useState, type FormEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

import DialogCloseButton from '../DialogCloseButton'
import type { DirectionType } from '@/types/directionType'
import { useDirectionStore } from '@/store/direction.store'

// Component Imports

type DirectionDataProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: DirectionType | null
  setData: any
}

const EditDirectionDialog = ({ open, setOpen, data, setData }: DirectionDataProps) => {
  //store
  const { createDirection, updateDirection, loading, fetchDirections } = useDirectionStore()

  // States
  const [nomDirection, setNomDirection] = useState<string | null>(data?.nom_direction || '')

  const handleClose = () => {
    setOpen(false)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (data?.id && data.nom_direction) {
      if (nomDirection) {
        const res = await updateDirection(data.id, { nom_direction: nomDirection })
        if (res) {
          setData((prev: DirectionType[]) =>
            prev.map((item: DirectionType) => {
              if (item.id === data.id) {
                return { ...data, nom_direction: nomDirection }
              } else return item
            })
          )
          handleClose()
        }
      }
    } else {
      if (nomDirection) {
        const res = await createDirection({ nom_direction: nomDirection })
        if (res) {
          setData((prev: DirectionType[]) => [...prev, res])
          handleClose()
        }
      }
    }
  }

  useEffect(() => {
    setNomDirection(data?.nom_direction || '')
  }, [data?.nom_direction])

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Modifier direction' : 'Créer un direction'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit your Compte' : 'Add card for future billing'}
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item>
              <CustomTextField
                fullWidth
                type='text'
                name='nom_direction'
                autoComplete='off'
                label='Nom direction'
                placeholder=''
                value={nomDirection}
                onChange={e => setNomDirection(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            {data ? 'Modifier' : 'Enrigestrer'}
          </Button>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Annuler
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDirectionDialog
