// eslint-disable react/no-array-index-key
import { Grid, makeStyles, Theme, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'bottom',
    padding: theme.spacing(1, 2, 3, 4),
  },
  bar: {
    flex: 1,
    height: '100%',
    marginTop: 'auto',
  },
  series: {
    marginRight: theme.spacing(3),
    display: 'flex',
    flex: 1,

    '&:last-child': {
      marginRight: 0,
    },
  },
  group: {
    marginRight: theme.spacing(1),
    flex: 1,
    display: 'flex',
    height: '100%',

    '&:last-child': {
      marginRight: 0,
    },
  },
}))

interface GraphSkeletonProps {
  series: number
  groups: number
  className?: string
  height?: number
  includeTitle?: boolean
}

/**
 * A skeleton component used to indicate that there is graph loading in its place
 */
const GraphSkeleton = ({ series, groups, className, height = 300, includeTitle }: GraphSkeletonProps) => {
  const classes = useStyles()

  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <div style={{ height: `${height}px`, display: 'flex', flexDirection: 'column' }}>
      {includeTitle && (
        <Skeleton variant="text" height={25} style={{ display: 'flex', width: '50%', margin: 'auto' }} />
      )}
      <div className={clsx(className, classes.table)}>
        {[...Array(series)].map((_, seriesKey) => (
          <div className={classes.series} key={seriesKey}>
            {[...Array(groups)].map((_, groupKey) => (
              <div className={classes.group} key={groupKey}>
                <Skeleton
                  variant="rect"
                  className={classes.bar}
                  height={`${randomIntFromInterval(30, 100)}%`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <Grid container spacing={1} justify="center" alignItems="center" style={{ paddingBottom: 8 }}>
        {[...Array(groups)].map((_, seriesKey) => (
          <Grid item key={seriesKey}>
            <Box display="flex" alignItems="center">
              <Skeleton variant="rect" height={20} width={20} style={{ marginRight: 5 }} />
              <Skeleton variant="text" height={15} width={50} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default GraphSkeleton
