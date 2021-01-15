import React from 'react'
import UnitsSkeleton from './UnitsSkeleton'
import StatsSkeleton from './StatsSkeleton'
import { Skeleton } from '@material-ui/lab'
import { Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  spacer: {
    marginBottom: theme.spacing(2),
  },
}))

const HomeSkeleton = () => {
  const classes = useStyles()
  const theme = useTheme()
  const statsAsTab = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Grid container spacing={1} style={{ padding: 8 }}>
        <Grid item xs md={6}>
          <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
          <UnitsSkeleton />
        </Grid>
        {!statsAsTab && (
          <Grid item xs>
            <div className={classes.spacer} />
            <StatsSkeleton />
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default React.memo(HomeSkeleton)
