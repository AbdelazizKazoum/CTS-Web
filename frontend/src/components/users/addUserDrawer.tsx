/* eslint-disable react/jsx-key */
// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UtilisateurType } from '@/types/userTypes'
import { UseUtilisateurStore } from '@/store/utilisateur.store'
import { useDirectionStore } from '@/store/direction.store'
import type { DirectionType } from '@/types/directionType'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UtilisateurType[]
  setData: (data: UtilisateurType[]) => void
}

type FormValidateType = {
  nom: string
  prenom: string
  matricule: string
  cin: string
  direction: string | null | number
  profile: null | number
}

type FormNonValidateType = {
  nom: string
  prenom: string
  cin: string
  matricule: string
  direction: number | null
}

// Vars
const initialData = {
  nom: '',
  prenom: '',
  cin: '',
  matricule: '',
  direction: 0
}

const AddUserDrawer = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData } = props

  //store
  const { createUser } = UseUtilisateurStore()
  const { fetchDirections, directions } = useDirectionStore()

  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      nom: '',
      prenom: '',
      matricule: '',
      cin: '',
      direction: 0
    }
  })

  const onSubmit = async (data: FormValidateType) => {
    const newUser: UtilisateurType = {
      nom: data.nom,
      prenom: data.prenom,
      matricule: data.matricule,
      cin: data.cin,
      direction: data.direction
    }

    setData([...(userData ?? []), newUser])

    const res = await createUser(newUser)

    console.log('get result from  api when success :', res)

    if (res.status !== 500) {
      handleClose()
      resetForm({ nom: '', prenom: '', matricule: '', direction: '', cin: '' })
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  useEffect(() => {
    // eslint-disable-next-line padding-line-between-statements
    ;(async () => {
      fetchDirections()
    })()
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='nom'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nom'
                placeholder='John Doe'
                {...(errors.nom && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='prenom'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Prénom'
                placeholder='johndoe'
                {...(errors.prenom && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='cin'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Cnie'
                placeholder=''
                {...(errors.prenom && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='matricule'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='text'
                label='Matricule'
                placeholder=''
                {...(errors.matricule && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='direction'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                label='Select Direction'
                {...field}
                {...(errors.direction && { error: true, helperText: 'This field is required.' })}
              >
                {directions?.map(function (item: DirectionType) {
                  return <MenuItem value={item.id}>{item.nom_direction}</MenuItem>
                })}
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
