import { Skeleton } from '@material-ui/lab'
import React from 'react'
import CardSkeleton from '../CardSkeleton'
import { Box, Grid } from '@material-ui/core'

const UnitsSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
      <div style={{ padding: '0 8px' }}>
        <CardSkeleton height={225} />
        <CardSkeleton height={225} />
        <Grid container spacing={1} style={{ marginTop: 2, paddingBottom: 8 }}>
          <Grid item xs={9} sm={10}>
            <Skeleton variant="rect" height={32}></Skeleton>
          </Grid>
          <Grid item xs={3} sm={2}>
            <Skeleton variant="rect" height={32}></Skeleton>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

export default UnitsSkeleton
