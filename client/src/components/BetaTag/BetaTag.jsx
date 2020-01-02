import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  caption: ({ variant }) => ({
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'super',
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
  variant: 'main',
};

BetaTag.propTypes = {
  /** Any additional classnames to apply to the component */
  className: PropTypes.string,
  /** The color variant to use */
  variant: PropTypes.oneOf(['main', 'light', 'dark']),
};

export default BetaTag;
