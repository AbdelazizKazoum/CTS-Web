/* eslint-disable import/no-unresolved */
// React Imports
import { useState, useEffect } from 'react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// import MenuItem from '@mui/material/MenuItem'

// Type Imports
import { MenuItem } from '@mui/material'

import type { UtilisateurType } from '@/types/userTypes'

import type { CourrierType } from '@/types/courrierTypes'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: CourrierType[]) => void
  tableData?: CourrierType[] | null
}) => {
  // States
  const [status, setStatus] = useState<CourrierType['status']>('')
  const [type, setType] = useState<CourrierType['type']>('')
  const [utilisateur, setUtilisateur] = useState<UtilisateurType['cin']>()

  // const [direction, setDirection] = useState<UtilisateurType['direction']>()

  useEffect(() => {
    const filteredData = tableData?.filter(courrier => {
      if (status && courrier.status !== status) return false
      if (type && courrier.type !== type) return false
      if (utilisateur && courrier.utilisateur.cin !== utilisateur) return false

      return true
    })

    setData(filteredData || [])
  }, [status, type, utilisateur, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            label='Status'
            id='custom-select'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value='INTERNE'>INTERNE</MenuItem>
            <MenuItem value='EXTERNE'>EXTERNE</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            label='Type'
            id='custom-select'
            value={type}
            onChange={e => setType(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value='ENTRANT'>Entrant</MenuItem>
            <MenuItem value='SORTANT'>Sortant</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Utilisateur'
            id='select-status'
            value={utilisateur}
            onChange={e => setUtilisateur(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          ></CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
