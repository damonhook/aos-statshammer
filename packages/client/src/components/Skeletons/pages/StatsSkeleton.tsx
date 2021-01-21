import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

import CardSkeleton from '../CardSkeleton'
import GraphSkeleton from '../GraphSkeleton'
import TableSkeleton from '../TableSkeleton'

const StatsSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column" style={{ padding: '0 8px' }}>
      <CardSkeleton height={80} />
      <div style={{ marginBottom: 20 }}>
        <TableSkeleton rows={7} columns={3} dense />
      </div>
      <div>
        <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
        <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
        <GraphSkeleton series={6} groups={2} includeTitle />
      </div>
    </Box>
  )
}

export default React.memo(StatsSkeleton)
