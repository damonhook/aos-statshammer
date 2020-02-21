import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SimulationsErrorCard } from 'components/ErrorCards';
import { GraphSkeleton } from 'components/Skeletons';
import _ from 'lodash';
import React from 'react';
import { TError } from 'types/store';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    height: '350px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  skeleton: {
    padding: theme.spacing(2, 4, 5),
  },
}));

interface ILoadableProps {
  loading: boolean;
  numUnits: number;
  error?: TError;
}

const Loadable: React.FC<ILoadableProps> = React.memo(
  ({ children, loading, numUnits, error }) => {
    const classes = useStyles({ numUnits });

    if (error) {
      return <SimulationsErrorCard />;
    }
    if (loading) {
      return (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid item className={classes.graphContainer} key={index}>
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
    return <>{children}</>;
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default Loadable;
