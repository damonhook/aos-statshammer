import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import {
  Close, CheckCircle, Warning, Error as ErrorIcon, Info,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { dismissNotification } from 'actions/notifications.action';
import clsx from 'clsx';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info,
};

const useStyles = makeStyles((theme) => ({
  notification: {
    position: 'relative',
    marginTop: '.5em',
    flex: '1 1 auto',
  },
  content: {
    flexWrap: 'nowrap',
  },
  success: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),

    '& $icon': {
      color: theme.palette.getContrastText(theme.palette.primary.light),
    },
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),

    '& $icon': {
      color: theme.palette.getContrastText(theme.palette.error.dark),
    },
  },
  info: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.getContrastText(theme.palette.grey[900]),

    '& $icon': {
      color: theme.palette.getContrastText(theme.palette.grey[900]),
    },
  },
  warning: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.secondary.light),

    '& $icon': {
      color: theme.palette.getContrastText(theme.palette.secondary.light),
    },
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Notification = ({ notification, dismissNotification, variant = 'info' }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const Icon = variantIcon[variant];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    setTimeout(() => dismissNotification(notification.key), 500);
  };

  return (
    <Snackbar
      className={classes.notification}
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <SnackbarContent
        className={clsx(classes.content, classes[variant])}
        message={(
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {notification.message}
          </span>
        )}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default connect(null, { dismissNotification })(Notification);
