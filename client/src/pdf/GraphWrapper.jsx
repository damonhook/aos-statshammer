import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '1000px',
    height: '100%',
    background: theme.palette.background.paper,
  },
  graph: {
    height: '400px',
  },
}));

const GraphWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, 'pdf-copy')}>
      <div className={classes.graph}>
        {children}
      </div>
    </div>
  );
};

GraphWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GraphWrapper;
