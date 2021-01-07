import { Skeleton } from '@material-ui/lab'
import React from 'react'
import CardSkeleton from './CardSkeleton'
import { Box, Grid } from '@material-ui/core'

const StatsSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
      <CardSkeleton height={225} />
      <CardSkeleton height={225} />
      <Grid container spacing={1} style={{ marginTop: 2 }}>
        <Grid item xs={10}>
          <Skeleton variant="rect" height={32}></Skeleton>
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rect" height={32}></Skeleton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StatsSkeleton
