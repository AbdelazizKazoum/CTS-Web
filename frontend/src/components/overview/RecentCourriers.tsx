'use client'
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
// MUI Imports
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import OptionMenu from '@core/components/option-menu'

import { Skeleton } from '@mui/material'

import { useCourrierStore } from '@/store/courrier.store'
import CustomIconButton from '@/@core/components/mui/IconButton'

const RecentCourriers = () => {
  // Hooks
  const { fetchCourriers, loading, courriers, setSelectedCourrier } = useCourrierStore()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await fetchCourriers()
    })()
  }, [fetchCourriers])

  return (
    <Card>
      {!loading ? (
        <>
          <CardHeader
            title='Derniers Courriers Créés par la Direction DGM'
            subheader='Total de 10 Courriers'
            action={<OptionMenu options={['Price - low to high', 'Price - high to low', 'Best seller']} />}
          />
          <CardContent className='flex flex-col gap-[1.638rem]'>
            {courriers.map((item, index) => (
              <div key={index} className='flex items-center gap-4'>
                <img src='/images/icons/pdf-document.png' alt='pdf' width={30} />

                <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
                  <div className='flex flex-col'>
                    <Typography className='font-medium' color='text.primary'>
                      {item.objet}
                    </Typography>
                    <Typography variant='body2'>{new Date(item.date_arrivee).toLocaleDateString()}</Typography>
                  </div>
                  <CustomIconButton
                    onClick={() => {
                      setSelectedCourrier(item)
                      router.push('/courriers/consulter')
                    }}
                    size='small'
                    variant='tonal'
                    color='secondary'
                    className='min-is-fit'
                  >
                    <i className='tabler-chevron-right' />
                  </CustomIconButton>
                </div>
              </div>
            ))}
          </CardContent>
        </>
      ) : (
        <Card className={`h-full ${loading && 'shadow-none'}`}>
          <div className='w-ful h-[300px]'>
            <Skeleton variant='rectangular' className='h-full' />
          </div>
        </Card>
      )}
    </Card>
  )
}

export default RecentCourriers
