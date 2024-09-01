/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
// React Imports
import { Fragment, useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UtilisateurType } from '@/types/userTypes'
import { UseUtilisateurStore } from '@/store/utilisateur.store'
import { useDirectionStore } from '@/store/direction.store'
import type { DirectionType } from '@/types/directionType'
import FileUploaderSingle from '../fileUploader'

type FormValidateType = {
  nom: string
  prenom: string
  matricule: string
  cin: string
  direction: DirectionType | number | null
  profile: null | number
  file: any
}

const AddUserDrawer = ({
  open,
  handleClose,
  userData,
  setData,
  formMode
}: {
  open: boolean
  handleClose: () => void
  userData?: UtilisateurType
  setData: any
  formMode: string
}) => {
  //store
  const { createUser, updateUser } = UseUtilisateurStore()
  const { fetchDirections, directions, loading } = useDirectionStore()

  // States
  const [files, setFiles] = useState<File[]>([])

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateType>({})

  const onSubmit = async (data: FormValidateType) => {
    const formData = new FormData()

    files.forEach(el => formData.append('file', el, data.nom))

    const newUser: UtilisateurType = {
      nom: data.nom,
      prenom: data.prenom,
      matricule: data.matricule,
      cin: data.cin,
      direction: directions?.find((item: DirectionType) => item.id === data.direction) || null,
      file: files[0]
    }

    // setData([...(userData ?? []), newUser])

    let res: any

    if (formMode === 'new') {
      res = await createUser(newUser)
    } else if (formMode === 'edit') {
      res = await updateUser({ ...newUser, id: userData?.id })
    } else {
      res = null
    }

    if (res.status || res.status !== 500) {
      setData((prev: UtilisateurType[]) =>
        prev.map((item: UtilisateurType) => {
          if (item.id === userData?.id) {
            return { ...item, ...newUser }
          } else {
            return item
          }
        })
      )
      handleClose()
      resetForm()
    }
  }

  const handleReset = () => {
    handleClose()
  }

  useEffect(
    function () {
      setValue('nom', userData?.nom || '')
      setValue('prenom', userData?.prenom || '  ')
      setValue('cin', userData?.cin || '')
      setValue('matricule', userData?.matricule || '')
      setValue('direction', userData?.direction?.id || 1)
    },
    [setValue, userData]
  )

  useEffect(() => {
    // eslint-disable-next-line padding-line-between-statements
    ;(async () => {
      fetchDirections()
    })()
  }, [fetchDirections])

  if (loading) return <CircularProgress />

  console.log('send files :', files)

  return (
    <div>
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
          <div className='flex flex-col gap-6 p-6'>
            <FileUploaderSingle setFiles={setFiles} files={files} />
          </div>
          <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
            <Controller
              name='nom'
              control={control}
              defaultValue={userData?.nom}
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
              defaultValue={userData?.prenom}
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
              defaultValue={userData?.cin}
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
              defaultValue={userData?.matricule}
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
              defaultValue={userData?.direction?.id || 1}
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
                    return (
                      <MenuItem key={item.id} value={item.id || ''}>
                        {item.nom_direction || ''}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />

            <div className='flex items-center gap-4'>
              {formMode === 'new' ? (
                <Button variant='contained' type='submit'>
                  Enregistrer
                </Button>
              ) : formMode === 'edit' ? (
                <Button variant='contained' type='submit'>
                  Modifier
                </Button>
              ) : formMode === 'view' ? (
                <></>
              ) : (
                ''
              )}

              <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default AddUserDrawer
