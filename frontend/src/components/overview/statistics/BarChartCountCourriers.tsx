'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

// eslint-disable-next-line import/no-unresolved
import CustomAvatar from '@core/components/mui/Avatar'

type Props = CardProps & {
  color: ThemeColor
}

const Card = styled(MuiCard)<Props>(({ color }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderBottomWidth: '2px',
  borderBottomColor: `var(--mui-palette-${color}-darkerOpacity)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderBottomWidth: '3px',
    borderBottomColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)',
    marginBlockEnd: '-1px'
  }
}))

const BarChartCountCourriers = (props: any) => {
  // Props
  const { title, stats } = props

  return (
    <Card color='primary'>
      <CardContent className='flex flex-col gap-7 '>
        <div className='flex items-center gap-4'>
          <CustomAvatar color='success' skin='light' variant='rounded'>
            <i className={classnames('tabler-chart-pie-2', 'text-[28px]')} />
          </CustomAvatar>
          <Typography variant='h4'>{stats}</Typography>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography>{title}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarChartCountCourriers
