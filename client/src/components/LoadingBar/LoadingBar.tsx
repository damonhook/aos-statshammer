import { Fade, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

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

interface ILoadingBarProps {
  wait?: number;
}

/**
 * A simple component to render a indeterminite loading bar on top of the component
 * */
const LoadingBar: React.FC<ILoadingBarProps> = ({ wait }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
    }, wait);

    return () => clearTimeout(timerId);
  }, [wait]);

  const fadeInTime = Math.min(Number(wait), 400);

  return (
    <div className={classes.loader}>
      <Fade in={loading} style={{ transitionDelay: loading ? `${fadeInTime}ms` : '0ms' }} unmountOnExit>
        <LinearProgress className={classes.bar} />
      </Fade>
    </div>
  );
};

LoadingBar.defaultProps = {
  wait: 500,
};

export default LoadingBar;
