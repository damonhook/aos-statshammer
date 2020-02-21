import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    width: '1000px',
    height: '100%',
    background: theme.palette.background.paper,
  },
}));

interface IGraphWrapperProps {
  className?: string;
  height?: number;
}

const GraphWrapper: React.FC<IGraphWrapperProps> = ({ children, className, height = 400 }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      <div style={{ height: `${height}px` }}>{children}</div>
    </div>
  );
};

export default GraphWrapper;
