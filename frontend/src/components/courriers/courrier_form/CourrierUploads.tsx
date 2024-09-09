/* eslint-disable import/no-unresolved */
'use client'

// React Imports
import type { Dispatch, SetStateAction } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/lib/styles/AppReactDropzone'

type FileProp = {
  name: string
  type: string
  size: number
}

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

const CourrierUploads = ({
  file,
  setFile,
  mode
}: {
  file?: File | null
  setFile: Dispatch<SetStateAction<File | null | undefined>>
  mode?: string
}) => {
  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFile(Object.assign(acceptedFiles[0]))
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const openDocument = (file: File) => {
    const URL = window.URL.createObjectURL(file)

    window.open(URL, '_blank')
  }

  const fileList = (file: File) => (
    <ListItem key={file.name} className='pis-4 plb-3'>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name font-medium' color='text.primary'>
            <i className=' text-blue-400 cursor-pointer ' onClick={() => openDocument(file)}>
              {file.name}
            </i>
          </Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <div className='flex gap-2'>
        <IconButton onClick={() => openDocument(file)}>
          <i className='tabler-eye ' />
        </IconButton>
        {mode === 'view' ? (
          ''
        ) : (
          <IconButton onClick={() => handleRemoveFile()}>
            <i className='tabler-x text-red-500 ' />
          </IconButton>
        )}
      </div>
    </ListItem>
  )

  return (
    <Dropzone>
      <Card>
        <CardHeader title='Courrier' sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }} />
        <CardContent>
          <div {...getRootProps({ className: `dropzone  ${mode ? (mode === 'view' ? 'hidden' : '') : ''}   ` })}>
            <input {...getInputProps()} />
            <div className='flex items-center flex-col gap-2 text-center'>
              <CustomAvatar variant='rounded' skin='light' color='secondary'>
                <i className='tabler-upload' />
              </CustomAvatar>
              <Typography variant='h4'>Glissez et déposez votre document ici.</Typography>
              <Typography color='text.disabled'>ou</Typography>
              <Button variant='tonal' size='small'>
                Parcourir
              </Button>
            </div>
          </div>
          {file !== null ? (
            <>
              <List>{file && fileList(file)}</List>
              {/* <div className='buttons'>
                <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
                <Button variant='contained'>Upload Files</Button>
              </div> */}
            </>
          ) : null}
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default CourrierUploads
