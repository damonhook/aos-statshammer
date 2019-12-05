import React from 'react';
import PropTypes from 'prop-types';
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
