import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
    <Typography component="div" className={clsx(classes.body, className)} {...other}>
      {children}
    </Typography>
  );
};

CardBody.defaultProps = {
  className: null,
};

CardBody.propTypes = {
  /** Child components to render inside the CardBody */
  children: PropTypes.node.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default CardBody;
