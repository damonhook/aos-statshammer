import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  caption: ({ variant }) => ({
    marginLeft: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
    color: theme.palette.secondary[variant],
  }),
}));

const BetaTag = ({ className, variant }) => {
  const classes = useStyles({ variant });

  return (
    <Typography variant="caption" color="secondary" className={clsx(classes.caption, className)}>
      Beta
    </Typography>
  );
};

BetaTag.defaultProps = {
  className: null,
  variant: 'default',
};

BetaTag.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dark']),
};

export default BetaTag;
