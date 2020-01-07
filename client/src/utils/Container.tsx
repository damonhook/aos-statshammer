import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: ({ fullHeight, variant, disablePadding }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background[variant],
    padding: theme.spacing(disablePadding ? 0 : 2),
    minHeight: fullHeight ? `Calc(100vh - ${disablePadding ? '16px' : '40px'})` : 300,
    margin: '-8px',
    color: theme.palette.text.primary,
  }),
}));

const Container = ({ children, fullHeight, variant, disablePadding }) => {
  const classes = useStyles({ fullHeight, variant, disablePadding });
  return <div className={classes.container}>{children}</div>;
};

Container.defaultProps = {
  children: null,
  fullHeight: true,
  variant: 'default',
  disablePadding: false,
};

export default Container;
