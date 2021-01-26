import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useMemo } from 'react'

import type { TooltipProps } from './types'

const useStyles = makeStyles(theme => ({
  tooltip: {
    padding: theme.spacing(1, 2),
  },
}))

interface ProbabilityTooltipProps extends TooltipProps {
  cumulative?: boolean
  inverted?: boolean
}

/**
 * A tooltip to display when you hover over a value in a graph
 */
const ProbabilityTooltip = ({
  active,
  payload = [],
  label = '',
  cumulative,
  inverted,
}: ProbabilityTooltipProps) => {
  const classes = useStyles()

  const operator = useMemo(() => {
    if (cumulative) return inverted ? '>=' : '<='
    return ''
  }, [cumulative, inverted])

  if (active) {
    return (
      <Paper className={classes.tooltip}>
        <Typography variant="h6">{`Damage: ${operator}${label}`}</Typography>
        {(payload ?? []).map(({ color, name, value }) => (
          <Typography style={{ color }} key={name}>{`${name}: ${value}%`}</Typography>
        ))}
      </Paper>
    )
  }
  return null
}

export default ProbabilityTooltip
