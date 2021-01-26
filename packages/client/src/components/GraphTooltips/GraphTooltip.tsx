import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import type { TooltipProps } from './types'

const useStyles = makeStyles(theme => ({
  tooltip: {
    padding: theme.spacing(1, 2),
  },
}))

/**
 * A tooltip to display when you hover over a value in a graph
 */
const GraphTooltip = ({ active, payload = [], label = '' }: TooltipProps) => {
  const classes = useStyles()
  if (active) {
    return (
      <Paper className={classes.tooltip} variant="outlined">
        <Typography variant="h6">{label}</Typography>
        {(payload ?? []).map(({ color, name, value }) => (
          <Typography style={{ color }} key={name}>{`${name}: ${value}`}</Typography>
        ))}
      </Paper>
    )
  }
  return null
}

export default GraphTooltip
