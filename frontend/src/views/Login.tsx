/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { FormEvent, useActionState, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import { FormHelperText } from '@mui/material'

import Logo from '@/components/layout/shared/Logo'
import { authenticate } from '@/lib/actions'

const FormLayoutsAlignment = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    try {
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Card className=''>
      <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
        <Logo />
      </div>{' '}
      <CardContent style={{ height: '100vh' }} className='flex flex-col items-center justify-center bs-[500px]'>
        <form className='p-12 max-is-[400px] border rounded'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>S&apos;inscrire</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='CNI' placeholder=' ' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Mot de passe'
                placeholder='············'
                id='form-layout-alignment-password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errorMessage && (
                <FormHelperText className='mt-4' error>
                  {errorMessage}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} className='pbs-2'>
              <FormControlLabel control={<Checkbox />} label="Ne m'oublie pas" />
            </Grid>
            <Grid item xs={12} className='pbs-2'>
              <Button variant='contained' type='submit' aria-disabled={isPending} fullWidth>
                Se connecter
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsAlignment
