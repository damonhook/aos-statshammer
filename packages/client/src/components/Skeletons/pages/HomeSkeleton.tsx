import React from 'react'
import UnitsSkeleton from './UnitsSkeleton'
import StatsSkeleton from './StatsSkeleton'
import { Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  spacer: {
    marginBottom: theme.spacing(4),
  },
}))

const HomeSkeleton = () => {
  const classes = useStyles()
  const theme = useTheme()
  const statsAsTab = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container spacing={1} style={{ paddingBottom: 8 }}>
      <Grid item xs lg={6}>
        <UnitsSkeleton />
      </Grid>
      {!statsAsTab && (
        <Grid item xs>
          <div className={classes.spacer} />
          <StatsSkeleton />
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(HomeSkeleton)
