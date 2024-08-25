/* eslint-disable import/default */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

import React from 'react'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/core'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
// import '@/lib/styles/tiptapEditor.css'
import '@/lib/styles/tiptapEditor.css'

import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'

import { FormHelperText, MenuItem } from '@mui/material'

import AppReactDatepicker from '@/lib/styles/AppReactDatepicker'

import type { CourrierType } from '@/types/courrierTypes'

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('tabler-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('tabler-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('tabler-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('tabler-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i
          className={classnames('tabler-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('tabler-align-center', {
            'text-textSecondary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('tabler-align-right', {
            'text-textSecondary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('tabler-align-justified', {
            'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

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
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Écrivez quelque chose ici...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],

    content: `
      <p>

      </p>
    `
  })

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

                  // <CustomTextField
                  //   {...field}
                  //   fullWidth
                  //   label='Date arrivée'
                  //   placeholder=''
                  //   {...(errors.date_arrivee && { error: true, helperText: 'Ce champ est obligatoire.' })}
                  // />
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
          <Card className='p-0 border shadow-none'>
            <CardContent className='p-0'>
              <EditorToolbar editor={editor} />
              <Divider className='mli-6' />
              <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' />
            </CardContent>
          </Card>
        </form>
      </CardContent>
    </Card>
  )
}

export default CourrierInformation
