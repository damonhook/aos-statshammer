import React from 'react';
import PropTypes from 'prop-types';
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

GraphWrapper.defaultProps = {
  loading: false,
  error: null,
  numUnits: 1,
};

GraphWrapper.propTypes = {
  /** Whether the child components are busy loading */
  loading: PropTypes.bool,
  /** Whether there was an error or not */
  error: PropTypes.string,
  /** The child components to render */
  children: PropTypes.node.isRequired,
  /** The number of units (used to generate the appropriate skeleton) */
  numUnits: PropTypes.number,
};

export default GraphWrapper;
