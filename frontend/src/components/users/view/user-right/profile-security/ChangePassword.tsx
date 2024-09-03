/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { CompteType, ProfileType } from '@/types/userTypes'
import { FormHelperText } from '@mui/material'

const ChangePassword = ({
  compte,
  updateCompte,
  profiles
}: {
  compte: CompteType

  profiles: ProfileType[]
  updateCompte: (comteData: CompteType) => Promise<any>
  loading: boolean
}) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [pass, setPass] = useState('')
  const [sending, setSending] = useState<boolean>(false)

  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isMatch, setIsMatch] = useState(true)

  async function updatePass() {
    if (compte && pass) {
      if (confirmPass === pass) {
        setIsMatch(true)
        setSending(true)
        const res = await updateCompte({ ...compte, pass })

        if (res) {
          console.log('sucess')
        }

        setSending(false)
      } else {
        setError('password not match')
        setIsMatch(false)
      }
    }
  }

  return (
    <>
      <CardHeader title='Change Password' />
      <CardContent className='flex flex-col gap-4'>
        <Alert icon={false} severity='warning' onClose={() => {}}>
          <AlertTitle>Ensure that these requirements are met</AlertTitle>
          Minimum 8 characters long, uppercase & symbol
        </Alert>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Password'
                error={!isMatch}
                type={isPasswordShown ? 'text' : 'password'}
                value={pass}
                onChange={e => setPass(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {error && (
                <FormHelperText className='mt-4' error>
                  Password Not match
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Confirm Password'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                value={confirmPass}
                error={!isMatch}
                onChange={e => {
                  if (e.target.value === pass && error != null) {
                    setIsMatch(true)
                    setError(null)
                  }

                  setConfirmPass(e.target.value)
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button onClick={updatePass} variant='contained'>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  )
}

export default ChangePassword
