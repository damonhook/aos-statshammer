import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '1000px',
    height: '100%',
    background: theme.palette.background.paper,
    // marginBottom: theme.spacing(3),
  },
  graph: (({ height }) => ({
    height: `${height}px`,
  })),
}));

const GraphWrapper = ({ children, className, height }) => {
  const classes = useStyles({ height });
  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.graph}>
        {children}
      </div>
    </div>
  );
};

GraphWrapper.defaultProps = {
  height: 400,
};

GraphWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GraphWrapper;
