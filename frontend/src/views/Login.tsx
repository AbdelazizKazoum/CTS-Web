/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import Logo from '@/components/layout/shared/Logo'
import { FormHelperText } from '@mui/material'

const FormLayoutsAlignment = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const [cni, setCni] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const onsubmit = async () => {
    if (cni && pass) {
      console.log(cni, pass)
    } else {
      setError('Veuillez entrer votre CNI et votre mot de passe.')
    }
  }

  return (
    <Card className=''>
      <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
        <Logo />
      </div>{' '}
      <CardContent style={{ height: '100vh' }} className='flex flex-col items-center justify-center bs-[500px]'>
        <form onSubmit={e => e.preventDefault()} className='p-12 max-is-[400px] border rounded'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>S&apos;inscrire</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                value={cni}
                onChange={e => setCni(e.target.value)}
                fullWidth
                label='CNI'
                placeholder=' '
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Mot de passe'
                placeholder='············'
                id='form-layout-alignment-password'
                type={isPasswordShown ? 'text' : 'password'}
                value={pass}
                onChange={e => setPass(e.target.value)}
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
              {error && (
                <FormHelperText className='mt-4' error>
                  {error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} className='pbs-2'>
              <FormControlLabel control={<Checkbox />} label="Ne m'oublie pas" />
            </Grid>
            <Grid item xs={12} className='pbs-2'>
              <Button onClick={onsubmit} variant='contained' type='submit' fullWidth>
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
