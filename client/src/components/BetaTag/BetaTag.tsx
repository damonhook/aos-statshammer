import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

interface IStyleProps {
  variant: 'main' | 'light' | 'dark';
}

const useStyles = makeStyles(theme => ({
  caption: ({ variant }: IStyleProps) => ({
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'super',
    color: theme.palette.secondary[variant],
  }),
}));

interface BetaTagProps {
  className?: string;
  variant?: 'main' | 'light' | 'dark';
}

const BetaTag = ({ className, variant = 'main' }: BetaTagProps) => {
  const classes = useStyles({ variant });

  return (
    <Typography variant="caption" color="secondary" className={clsx(classes.caption, className)}>
      Beta
    </Typography>
  );
};

export default BetaTag;
