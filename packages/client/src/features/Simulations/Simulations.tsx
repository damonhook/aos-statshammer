import { Grid, makeStyles, Theme } from '@material-ui/core'
import CollapsibleCard from 'components/CollapsibleCard'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import React from 'react'

import SimulationsToolbar from './SimulationsToolbar'

const useStyles = makeStyles((theme: Theme) => ({
  simulations: {
    margin: theme.spacing(1),
  },
  toolbar: {
    padding: theme.spacing(0.5, 0.5, 1),
  },
  collection: {
    padding: theme.spacing(0.5),
  },
}))

const Simulations = () => {
  const classes = useStyles()

  return (
    <div className={classes.simulations}>
      <SimulationsToolbar />
      <div className={classes.collection}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CollapsibleCard title="Cumulative Probability">
              <GraphSkeleton series={6} groups={2} includeTitle />
            </CollapsibleCard>
          </Grid>
          <Grid item xs>
            <CollapsibleCard title="Discrete Probability">
              <GraphSkeleton series={6} groups={2} includeTitle />
            </CollapsibleCard>
          </Grid>
        </Grid>
      </div>
      <div className={classes.collection}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CollapsibleCard title="Average Damage">
              <GraphSkeleton series={6} groups={2} includeTitle />
            </CollapsibleCard>
          </Grid>
          <Grid item xs>
            <CollapsibleCard title="Metrics">
              <TableSkeleton rows={3} columns={3} dense />
            </CollapsibleCard>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Simulations
