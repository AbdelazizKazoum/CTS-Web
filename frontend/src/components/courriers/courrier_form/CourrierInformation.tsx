/* eslint-disable import/default */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

import React from 'react'

// MUI Imports
// import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/lib/styles/tiptapEditor.css'

import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'

import { FormHelperText, MenuItem } from '@mui/material'

import AppReactDatepicker from '@/lib/styles/AppReactDatepicker'

import type { CourrierType } from '@/types/courrierTypes'

const CourrierInformation = ({
  handleSubmit,
  control,
  errors,
  onSubmit,
  formRef
}: {
  handleSubmit: UseFormHandleSubmit<CourrierType, undefined>
  control: Control<CourrierType, any>
  errors: FieldErrors<CourrierType>
  onSubmit: (data: any) => void
  formRef: React.RefObject<HTMLFormElement>
}) => {
  return (
    <Card>
      <CardHeader title='Informations du courrier' />
      <CardContent>
        <form ref={formRef} action='' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} className='mbe-6'>
            <Grid item xs={12}>
              <Controller
                name='objet'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Objet'
                    placeholder=''
                    {...(errors.objet && { error: true, helperText: 'Ce champ est obligatoire.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='date_arrivee'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomTextField
                        value={value}
                        onChange={onChange}
                        fullWidth
                        label='Date arrivée'
                        {...(errors.date_arrivee && { error: true, helperText: 'Ce champ est obligatoire.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='origine'
                control={control}
                rules={{ required: true }}
                render={function ({ field }) {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Origine'
                      placeholder=''
                      {...(errors.origine && { error: true, helperText: 'Ce champ est obligatoire.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='pre_reference'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Pré Référence'
                    placeholder=''
                    {...(errors.pre_reference && { error: true, helperText: 'Ce champ est obligatoire.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='date_pre_reference'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomTextField
                        value={value}
                        onChange={onChange}
                        fullWidth
                        label='Date pré Référence'
                        {...(errors.date_pre_reference && { error: true, helperText: 'Ce champ est obligatoire.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='reference'
                control={control}
                rules={{ required: true }}
                render={function ({ field }) {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Référence'
                      placeholder=''
                      {...(errors.reference && { error: true, helperText: 'Ce champ est obligatoire.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='date_courrier'
                control={control}
                rules={{ required: true }}
                render={function ({ field: { value, onChange } }) {
                  return (
                    <AppReactDatepicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={onChange}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomTextField
                          value={value}
                          onChange={onChange}
                          fullWidth
                          label='Date Courrie'
                          {...(errors.date_courrier && { error: true, helperText: 'Ce champ est obligatoire.' })}
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='classement'
                control={control}
                rules={{ required: true }}
                render={function ({ field }) {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Classement'
                      placeholder=''
                      {...(errors.classement && { error: true, helperText: 'Ce champ est obligatoire.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='date_traitement'
                control={control}
                rules={{ required: true }}
                render={function ({ field: { value, onChange } }) {
                  return (
                    <AppReactDatepicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={onChange}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomTextField
                          value={value}
                          onChange={onChange}
                          fullWidth
                          label='Date Traitement'
                          {...(errors.date_traitement && { error: true, helperText: 'Ce champ est obligatoire.' })}
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Status' {...field} error={Boolean(errors.status)}>
                    <MenuItem value=''>Selectionner statut</MenuItem>
                    <MenuItem value='ENTRANT'>INTERNE</MenuItem>
                    <MenuItem value='EXTERNE'>EXTERNE</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.status && <FormHelperText error>Ce champ est obligatoire.</FormHelperText>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Type' {...field} error={Boolean(errors.type)}>
                    <MenuItem value='ENTRANT'>Entrant</MenuItem>
                    <MenuItem value='SORTANT'>Sortant</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.type && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='destinataire'
                control={control}
                rules={{ required: true }}
                render={function ({ field }) {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Destinataire'
                      placeholder=''
                      {...(errors.destinataire && { error: true, helperText: 'Ce champ est obligatoire.' })}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
          <Typography className='mbe-1'>Description (Optional)</Typography>
        </form>
      </CardContent>
    </Card>
  )
}

export default CourrierInformation
