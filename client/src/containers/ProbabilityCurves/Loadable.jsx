import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { GraphSkeleton } from 'components/Skeletons';
import { AdvancedStatsErrorCard } from 'components/ErrorCards';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  graphContainer: ({ numUnits }) => ({
    height: numUnits >= 3 ? '350px' : '250px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  }),
  skeleton: {
    padding: theme.spacing(2, 4, 5),
  },
}));

const Loadable = React.memo(({
  children, loading, numUnits, error,
}) => {
  const classes = useStyles({ numUnits });

  if (error) {
    return <AdvancedStatsErrorCard />;
  }
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map(() => (
          <Grid item className={classes.graphContainer}>
            <GraphSkeleton
              series={5}
              groups={2}
              height={numUnits >= 3 ? 350 : 250}
              className={classes.skeleton}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return children;
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default Loadable;
