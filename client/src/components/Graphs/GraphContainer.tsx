import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ResponsiveContainer } from 'recharts';
import { Typography } from '@material-ui/core';

const useSyles = makeStyles(theme => ({
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
    color: theme.palette.getContrastText(theme.palette.background.paper),
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
    <div className={clsx(classes.container, className)}>
      {title && (
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="98%" height="98%" className={classes.responsive}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default GraphContainer;
