import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
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
