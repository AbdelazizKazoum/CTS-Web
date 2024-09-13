/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-unresolved */
'use client'

// MUI Imports
import { useEffect } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import type { TimelineProps } from '@mui/lab/Timeline'

// Components Imports
import OptionMenu from '@core/components/option-menu'

import { Skeleton } from '@mui/material'

import { useCourrierStore } from '@/store/courrier.store'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const RecievedCourriers = () => {
  const { fetchCourriersRecu, courriersRecu, loading } = useCourrierStore()

  useEffect(() => {
    ;(async () => {
      await fetchCourriersRecu()
    })()
  }, [fetchCourriersRecu])

  return (
    <Card>
      {!loading ? (
        <>
          <CardHeader
            avatar={<i className='tabler-list-details text-xl' />}
            title='Courriers Internes Reçus'
            titleTypographyProps={{ variant: 'h5' }}
            action={<OptionMenu options={['Share timeline', 'Suggest edits', 'Report bug']} />}
            sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
          />
          <CardContent className='flex flex-col gap-6 pbe-5'>
            <Timeline>
              {courriersRecu.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color='primary' />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                      <Typography className='font-medium' color='text.primary'>
                        {item.objet}
                      </Typography>
                      <Typography variant='caption'>12 min ago</Typography>
                    </div>
                    <Typography className='mbe-2'>
                      {`Créer par ${item.utilisateur.nom} ${item.utilisateur.prenom} (${item.origine})`}
                    </Typography>
                    <div className='flex items-center gap-2.5 is-fit rounded bg-actionHover plb-[5px] pli-2.5'>
                      <img height={20} alt='invoice.pdf' src='/images/icons/pdf-document.png' />
                      <Typography className='font-medium'>{item.filePath}</Typography>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
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

export default RecievedCourriers
