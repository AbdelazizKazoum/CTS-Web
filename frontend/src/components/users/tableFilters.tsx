// React Imports
import { useState, useEffect } from 'react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { UtilisateurType } from '@/types/userTypes'


const TableFilters = ({ setData, tableData }: { setData: (data: UsersType[]) => void; tableData?: UsersType[] }) => {
  // States
  const [nom, setNom] = useState<UtilisateurType['nom']>('')
  const [prenom, setPrenom] = useState<UtilisateurType['prenom']>('')
  const [matricule, setMatricule] = useState<UtilisateurType['matricule']>()

  // const [direction, setDirection] = useState<UtilisateurType['direction']>()


  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (nom && user.nom !== nom) return false
      if (prenom && user.prenom !== prenom) return false
      if (matricule && user.matricule !== matricule) return false

      return true
    })

    setData(filteredData || [])
  }, [nom, prenom, matricule, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            label="Nom"
            id='select-role'
            value={nom}
            onChange={e => setNom(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            label="Prenom"
            id='select-plan'
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Matricule'
            id='select-status'
            value={matricule}
            onChange={e => setMatricule(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
