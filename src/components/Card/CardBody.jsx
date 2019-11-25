import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  body: {
    padding: '1.5em',
    flexWrap: 'wrap',
  },
});

const CardBody = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.body} ${className}`} {...other}>
      {children}
    </div>
  );
};

export default CardBody;
