import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  body: {
    padding: '1em',
    flexWrap: 'wrap',
  },
});

const CardBody = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.body, className)} {...other}>
      {children}
    </div>
  );
};

export default CardBody;
