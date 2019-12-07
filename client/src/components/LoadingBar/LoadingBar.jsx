import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loader: {
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
}));

const LoadingBar = ({ wait }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, wait);
  }, []);

  const fadeInTime = Math.min(wait, 400);

  return (
    <div className={classes.loader}>
      <Fade
        in={loading}
        style={{ transitionDelay: loading ? `${fadeInTime}ms` : '0ms' }}
        unmountOnExit
      >
        <LinearProgress className={classes.bar} />
      </Fade>
    </div>
  );
};

LoadingBar.defaultProps = {
  wait: 500,
};

LoadingBar.propTypes = {
  /** How long to wait before displaying the loading bar */
  wait: PropTypes.number,
};

export default LoadingBar;
