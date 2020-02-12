import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface ICardProps {
  className?: string;
}

/**
 * A generic Card component based on the material ui Paper
 */
const Card: React.FC<ICardProps> = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.card} ${className}`} {...other}>
      {children}
    </Paper>
  );
};

export default Card;
