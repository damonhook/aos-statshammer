import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.grey[50],
    padding: '0.5em 1.5em',
    display: 'flex',
    flexDirection: 'row',
  },
}));

const CardHeader = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={`${classes.header} ${className}`} {...other}>
      {children}
    </Typography>
  );
};

export default CardHeader;
