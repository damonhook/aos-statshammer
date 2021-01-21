import { Box, makeStyles, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

import CardSkeleton from '../CardSkeleton'

const useStyles = makeStyles((theme: Theme) => ({
  addButton: { flex: 1, marginRight: theme.spacing(1) },
}))

const UnitsSkeleton = () => {
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="column">
      <CardSkeleton height={150} />
      <CardSkeleton height={150} />
      <Box display="flex">
        <Skeleton variant="rect" height={32} className={classes.addButton}></Skeleton>
        <Skeleton variant="rect" height={32} width={128}></Skeleton>
      </Box>
    </Box>
  )
}

export default React.memo(UnitsSkeleton)
