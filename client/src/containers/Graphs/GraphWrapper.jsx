import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import StatsErrorCard from 'components/StatsErrorCard';

const useStyles = makeStyles((theme) => ({
  loader: {
    padding: '2em',
  },
  error: {
    height: '350px',
    width: 'auto',
    margin: theme.spacing(2, 2, 0),
  },
}));

const GraphWrapper = ({
  loading, error, children, numUnits,
}) => {
  const classes = useStyles();
  const groups = numUnits || 1;

  if (loading) {
    return <GraphSkeleton height={340} series={7} groups={groups} className={classes.loader} />;
  }
  if (error) {
    return <StatsErrorCard className={classes.error} />;
  }
  return <div>{children}</div>;
};

export default GraphWrapper;
