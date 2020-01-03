import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  body: {
    padding: '1em',
    flexWrap: 'wrap',
  },
});

interface ICardBodyProps {
  className?: string;
}

const CardBody: React.FC<ICardBodyProps> = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={clsx(classes.body, className)} {...other}>
      {children}
    </Typography>
  );
};

export default CardBody;
