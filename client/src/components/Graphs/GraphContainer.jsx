import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ResponsiveContainer } from 'recharts';
import { Typography } from '@material-ui/core';


const useSyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  responsive: {
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
}));

/**
 * A wrapper for all of the graphs
 */
const GraphContainer = ({ className, title, children }) => {
  const classes = useSyles();

  return (
    <div className={clsx(classes.container, className)}>
      {title && (
        <Typography variant="h6" className={classes.title}>{title}</Typography>
      )}
      <ResponsiveContainer width="98%" className={classes.responsive}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

GraphContainer.defaultProps = {
  className: null,
};

GraphContainer.propTypes = {
  /** Child components to render inside the Container */
  children: PropTypes.node.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


export default GraphContainer;
