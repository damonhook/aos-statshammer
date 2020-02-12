import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(8),
    },
  },
}));

interface FloatingButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  className?: string;
}

/** A floating button component that is used for the mobile interface */
const FloatingButton = ({ onClick, disabled = false, icon, className }: FloatingButtonProps) => {
  const classes = useStyles();
  return (
    <Fab
      className={clsx(classes.fab, className)}
      onClick={onClick}
      color="primary"
      disabled={disabled}
      size="large"
    >
      {icon}
    </Fab>
  );
};

export default FloatingButton;
