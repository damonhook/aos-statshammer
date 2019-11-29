import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Card = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.card} ${className}`} {...other}>
      {children}
    </Paper>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
