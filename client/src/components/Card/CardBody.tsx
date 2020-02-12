import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

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
