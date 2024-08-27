// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const CourrierHeader = ({ submitFormClick, loading }: { submitFormClick: () => void; loading: boolean }) => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter un nouveau courrier
        </Typography>
      </div>
      <div className='flex flex-wrap gap-4'>
        <Button variant='tonal' color='secondary'>
          Rejeter
        </Button>
        <Button variant='tonal'>Sauvegarder le brouillon</Button>
        <Button
          onClick={submitFormClick}
          variant='contained'
          disabled={loading}

          // startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? <CircularProgress size={20} color='inherit' /> : 'Enregistrer le courrier'}
        </Button>
      </div>
    </div>
  )
}

export default CourrierHeader
