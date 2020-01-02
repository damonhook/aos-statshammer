import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  scroll: {
    minHeight: 2000,
    overflowY: 'scroll',
    background: theme.palette.background.default,
    margin: '-8px',
  },
}));

const ScrollContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.scroll}>{children}</div>;
};

ScrollContainer.defaultProps = {
  children: null,
};

ScrollContainer.propTypes = {
  children: PropTypes.node,
};

export default ScrollContainer;
