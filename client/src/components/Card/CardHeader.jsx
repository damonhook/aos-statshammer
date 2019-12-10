import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

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

const CardHeader = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={clsx(classes.header, className)} {...other}>
      {children}
    </Typography>
  );
};

CardHeader.defaultProps = {
  className: null,
};

CardHeader.propTypes = {
  /** Child components to render inside the CardHeader */
  children: PropTypes.node.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


export default CardHeader;
