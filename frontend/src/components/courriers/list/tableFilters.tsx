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
import { useDirectionStore } from '@/store/direction.store'
import { DirectionType } from '@/types/directionType'
import { UseUtilisateurStore } from '@/store/utilisateur.store'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: CourrierType[]) => void
  tableData?: CourrierType[] | null
}) => {
  // States
  const [status, setStatus] = useState<CourrierType['status']>('')
  const [direction, setDirection] = useState<DirectionType['nom_direction']>('')

  const [type, setType] = useState<CourrierType['type']>('')
  const [utilisateur, setUtilisateur] = useState<UtilisateurType['cin']>()

  // Store
  const { directions } = useDirectionStore()
  const { users } = UseUtilisateurStore()

  useEffect(() => {
    const filteredData = tableData?.filter(courrier => {
      if (status && courrier.status !== status) return false
      if (type && courrier.type !== type) return false
      if (utilisateur && courrier.utilisateur.cin !== utilisateur) return false
      if (direction && courrier.utilisateur.direction?.nom_direction !== direction) return false

      return true
    })

    setData(filteredData || [])
  }, [status, type, utilisateur, tableData, setData, direction])

  return (
    <CardContent>
      <Grid container spacing={6}>
        {
          <>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                defaultValue=''
                label='Direction'
                id='custom-select'
                value={direction}
                onChange={e => setDirection(e.target.value)}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value=''>
                  <em>Aucun</em>
                </MenuItem>
                {directions?.map((item: DirectionType) => (
                  <MenuItem key={item.id} value={item.nom_direction}>
                    {' '}
                    {item.nom_direction}{' '}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </>
        }

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
        {/* <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Utilisateur'
            id='select-status'
            value={utilisateur}
            onChange={e => setUtilisateur(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          ></CustomTextField>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            label='Utilisateur'
            id='custom-select'
            value={utilisateur}
            onChange={e => setUtilisateur(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Aucun</em>
            </MenuItem>
            {users?.map((item: UtilisateurType) => (
              <MenuItem key={item.id} value={item.cin}>
                {` ${item.nom} ${item.prenom}   ${item.compte?.pseudo && ` (${item.compte?.pseudo || ''}) `}  `}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
