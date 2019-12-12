import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ResponsiveContainer } from 'recharts';


const useSyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
  },
  responsive: {},
});

/**
 * A wrapper for all of the graphs
 */
const GraphContainer = ({ className, children }) => {
  const classes = useSyles();

  return (
    <div className={clsx(classes.container, className)}>
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
