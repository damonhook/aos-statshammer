import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  caption: ({ variant }) => ({
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'super',
    color: theme.palette.secondary[variant],
  }),
}));

interface BetaTagProps {
  className?: string;
  variant?: 'main' | 'light' | 'dark';
}

const BetaTag: React.FC<BetaTagProps> = ({ className, variant }) => {
  const classes = useStyles({ variant });

  return (
    <Typography variant="caption" color="secondary" className={clsx(classes.caption, className)}>
      Beta
    </Typography>
  );
};

BetaTag.defaultProps = {
  variant: 'main',
};

export default BetaTag;
