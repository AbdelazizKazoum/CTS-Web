/* eslint-disable import/no-unresolved */
// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// import Button from '@mui/material/Button'

// import type { ButtonProps } from '@mui/material/Button'

// Type Imports
// import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

import type { UtilisateurType } from '@/types/userTypes'

const UserDetails = ({ userData }: { userData: UtilisateurType }) => {
  // Vars
  // const buttonProps = (children: string, color: ThemeColor, variant: ButtonProps['variant']): ButtonProps => ({
  //   children,
  //   color,
  //   variant
  // })

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
                <Typography variant='h5'>{`${userData.nom} ${userData.prenom}`}</Typography>
              </div>
              <Chip label={userData.compte?.profile?.libeleFunction} color='secondary' size='small' variant='tonal' />
            </div>
            <div className='flex items-center flex-wrap gap-4'>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='tabler-checkbox' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>{userData.countCodifiedCourriers}</Typography>
                  <Typography>Les Courriers Modifiers</Typography>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='tabler-briefcase' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>{userData.countCourriers}</Typography>
                  <Typography>Les Courriers Crées</Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Nom:
                </Typography>
                <Typography>{userData.nom}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Prénom:
                </Typography>
                <Typography>{userData.prenom}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Matricule
                </Typography>
                <Typography color='text.primary'>{userData.matricule}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Cine:
                </Typography>
                <Typography color='text.primary'>{userData.cin}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Direction:
                </Typography>
                <Typography color='text.primary'>{userData.direction?.nom_direction}</Typography>
              </div>
            </div>
          </div>
          {/* <div className='flex gap-4 justify-center'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Edit', 'primary', 'contained')}
              dialog={EditUserInfo}
              dialogProps={{ data: userData }}
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Suspend', 'error', 'tonal')}
              dialog={ConfirmationDialog}
              dialogProps={{ type: 'suspend-account' }}
            />
          </div> */}
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
