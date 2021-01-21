import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

import CardSkeleton from '../CardSkeleton'

const TargetSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Skeleton variant="rect" height={32} style={{ marginBottom: 10 }} />
      <CardSkeleton height={180} />
    </Box>
  )
}

export default React.memo(TargetSkeleton)
