import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1, 2),
    minHeight: theme.spacing(6),
    display: 'flex',
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      minHeight: theme.spacing(7),
    },
  },
}));

interface ICardHeaderProps {
  className?: string;
}

const CardHeader: React.FC<ICardHeaderProps> = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={clsx(classes.header, className)} {...other}>
      {children}
    </Typography>
  );
};

export default CardHeader;
