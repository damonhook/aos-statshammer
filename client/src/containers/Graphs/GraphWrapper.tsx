import { makeStyles } from '@material-ui/core/styles';
import { StatsErrorCard } from 'components/ErrorCards';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import React from 'react';

const useStyles = makeStyles(theme => ({
  graphWrapper: {
    height: '350px',
  },
  loader: {
    padding: '2em',
  },
  error: {
    height: '350px',
    width: 'auto',
    margin: theme.spacing(2, 2, 0),
  },
}));

interface GraphWrapperProps {
  loading: boolean;
  error?: boolean | string;
  numUnits: number;
}

const GraphWrapper: React.FC<GraphWrapperProps> = ({ loading, error, children, numUnits }) => {
  const classes = useStyles();
  const groups = numUnits || 1;

  if (loading) {
    return <GraphSkeleton height={340} series={7} groups={groups} className={classes.loader} />;
  }
  if (error) {
    return <StatsErrorCard className={classes.error} />;
  }
  return <div className={classes.graphWrapper}>{children}</div>;
};

GraphWrapper.defaultProps = {
  loading: false,
  numUnits: 1,
};

export default GraphWrapper;
