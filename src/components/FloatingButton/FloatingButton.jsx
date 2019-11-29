import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  rootFab: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
    zIndex: theme.zIndex.appBar,
    flexShrink: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FloatingButton = ({ onClick, disabled, icon }) => {
  const classes = useStyles();
  return (
    <Fab
      className={clsx(classes.rootFab, classes.fab)}
      onClick={onClick}
      variant="contained"
      color="primary"
      disabled={disabled}
    >
      {icon}
    </Fab>
  );
};

export default FloatingButton;
