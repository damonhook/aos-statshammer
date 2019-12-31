import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: ({ fullHeight, variant, disablePadding }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background[variant],
    padding: theme.spacing(disablePadding ? 0 : 2),
    minHeight: fullHeight ? `Calc(100vh - ${disablePadding ? '16px' : '40px'})` : 300,
    margin: '-8px',
  }),
}));

const Container = ({
  children, fullHeight, variant, disablePadding,
}) => {
  const classes = useStyles({ fullHeight, variant, disablePadding });
  return (
    <div className={classes.container}>{children}</div>
  );
};

Container.defaultProps = {
  children: null,
  fullHeight: true,
  variant: 'default',
  disablePadding: false,
};

Container.propTypes = {
  children: PropTypes.node,
  fullHeight: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'paper', 'nested']),
  disablePadding: PropTypes.bool,
};

export default Container;
