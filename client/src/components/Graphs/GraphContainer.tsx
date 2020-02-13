import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { ResponsiveContainer } from 'recharts';

const useSyles = makeStyles(theme => ({
  graphContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
}));

interface GraphContainerProps {
  className?: string;
  title?: string;
}

/**
 * A wrapper for all of the graphs
 */
const GraphContainer: React.FC<GraphContainerProps> = ({ className, title, children }) => {
  const classes = useSyles();

  return (
    <div className={clsx(classes.graphContainer, className)}>
      {title && (
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      )}
      <div className={clsx(classes.wrapper)}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphContainer;
