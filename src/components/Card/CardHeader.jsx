import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#fafafa',
    padding: '0.5em 1.5em',
    display: 'flex',
    flexDirection: 'row',
  },
});

const CardHeader = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.header} ${className}`} {...other}>
      {children}
    </div>
  );
};

export default CardHeader;
