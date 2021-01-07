import React from 'react'
import UnitsSkeleton from './UnitsSkeleton'
import StatsSkeleton from './StatsSkeleton'
import { Grid, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  spacer: {
    marginBottom: theme.spacing(4),
  },
}))

const HomeSkeleton = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <UnitsSkeleton />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.spacer} />
        <StatsSkeleton />
      </Grid>
    </Grid>
  )
}

export default HomeSkeleton
