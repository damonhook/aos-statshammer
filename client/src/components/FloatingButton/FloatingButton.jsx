import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(7.5),
    },
  },
}));

/** A floating button component that is used for the mobile interface */
const FloatingButton = ({
  onClick, disabled, icon, className,
}) => {
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

FloatingButton.defaultProps = {
  disabled: false,
  className: null,
};

FloatingButton.propTypes = {
  /** The function to call when the button is clicked */
  onClick: PropTypes.func.isRequired,
  /** Whether the button is disabled or not */
  disabled: PropTypes.bool,
  /** The icon component to render in the button */
  icon: PropTypes.node.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default FloatingButton;
