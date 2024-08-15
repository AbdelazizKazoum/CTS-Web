// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const CourrierHeader = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter un nouveau courrier{' '}
        </Typography>
        {/* <Typography>Orders placed across your store</Typography> */}
      </div>
      <div className='flex flex-wrap gap-4'>
        <Button variant='tonal' color='secondary'>
          Rejeter
        </Button>
        <Button variant='tonal'>Sauvegarder le brouillon</Button>
        <Button variant='contained'>Enregistrer le courrier</Button>
      </div>
    </div>
  )
}

export default CourrierHeader
