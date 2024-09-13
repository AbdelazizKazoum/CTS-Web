/* eslint-disable import/no-unresolved */
'use client'
import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { TextFieldProps } from '@mui/material'

import { Button, Card, CardHeader, IconButton, MenuItem, TablePagination, Typography } from '@mui/material'

import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import classNames from 'classnames'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import TablePaginationComponent from '@/components/TablePaginationComponent'

import OptionMenu from '@/@core/components/option-menu'
import CustomTextField from '@/@core/components/mui/TextField'

import TableFilters from './tableFilters'

import type { CourrierType } from '@/types/courrierTypes'
import { useCourrierStore } from '@/store/courrier.store'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'

type CourriersTypeWithAction = CourrierType & {
  action?: string
}

// Column Definitions
const columnHelper = createColumnHelper<CourriersTypeWithAction>()

export const CourriersList = ({ tableData }: { tableData: CourrierType[] | null }) => {
  // States
  // const [openCourrier, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})

  // const [filteredData, setFilteredData] = useState()
  const [globalFilter, setGlobalFilter] = useState('')

  const [data, setData] = useState<CourrierType[] | null>(...[tableData])
  const [courrier, setCourrier] = useState<CourrierType | null>()

  //actions
  const { setSelectedCourrier } = useCourrierStore()

  // const [formMode, setFormMode] = useState('edit')

  //
  const router = useRouter()

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<TextFieldProps, 'onChange'>) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
  }

  const getAvatar = (params: Pick<any, 'avatar' | 'name'>) => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={30} />
    } else {
      return (
        <CustomAvatar skin='light' size={30}>
          {getInitials(name as string)}
        </CustomAvatar>
      )
    }
  }

  const columns = useMemo<ColumnDef<CourriersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: '',
        cell: ({}) => (
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              {getAvatar({ avatar: '/images/icons/pdf.png', name: 'pdf' })}
              {/* <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {row.original.id}
                </Typography>
              </div> */}
            </div>
          </div>
        )
      }),
      columnHelper.accessor('date_arrivee', {
        header: 'Date arrivée',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>
              {row.original.date_arrivee && new Date(row.original.date_arrivee).toLocaleDateString()}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('pre_reference', {
        header: 'Pré Référence',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>{row.original.pre_reference}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('date_pre_reference', {
        header: 'Date Pré Référence',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>
              {row.original.date_pre_reference && new Date(row.original.date_pre_reference).toLocaleDateString()}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('origine', {
        header: 'Origine',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>{row.original?.origine}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('reference', {
        header: 'Référence',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>{row.original?.reference}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('date_courrier', {
        header: 'Date courrier',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>
              {row.original?.date_courrier && new Date(row.original?.date_courrier).toLocaleDateString()}
            </Typography>
          </div>
        )
      }),

      columnHelper.accessor('objet', {
        header: 'Objet',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>{row.original?.objet}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('classement', {
        header: 'Classement',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>{row.original?.classement}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('date_traitement', {
        header: 'Date Traitment',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize'>
              {row.original?.date_traitement && new Date(row.original?.date_traitement).toLocaleDateString()}
            </Typography>
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <i
                onClick={() => {
                  setSelectedCourrier(row.original)
                  router.push('/courriers/consulter')
                }}
                className='tabler-eye text-textSecondary'
              />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Modifier',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setSelectedCourrier(row.original)
                      router.push('/courriers/modifier')

                      // setAddUserOpen(!addUserOpen)
                    }
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [[], []]
  )

  const table = useReactTable({
    data: data as CourrierType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  console.log('courriers', courrier)

  return (
    <div>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setData} tableData={tableData} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Courrier'
              className='is-full sm:is-auto'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => {
                setCourrier(null)
                router.push('/courriers/ajouter')
              }}
              className='is-full sm:is-auto'
            >
              Ajouter un nouveau courrier
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classNames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table?.getFilteredRowModel()?.rows?.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    {}
                    Pas de données disponibles{' '}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classNames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
    </div>
  )
}
