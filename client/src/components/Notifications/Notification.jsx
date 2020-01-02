import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import {
  Close, CheckCircle, Warning, Error as ErrorIcon, Info,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { dismissNotification } from 'actions/notifications.action';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

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
    zIndex: theme.zIndex.snackbar,
  },
  content: {
    flexWrap: 'nowrap',
  },
  success: {
    backgroundColor: green[600],
    color: theme.palette.getContrastText(green[600]),

    '& $icon': {
      color: theme.palette.getContrastText(green[600]),
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
    backgroundColor: amber[500],
    color: theme.palette.getContrastText(amber[500]),

    '& $icon': {
      color: theme.palette.getContrastText(amber[500]),
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

/**
 * A single notification snackbar
 */
const Notification = ({
  message, notificationId, dismissNotification, variant, timeout,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const Icon = variantIcon[variant];

  useEffect(() => {
    setOpen(true);
  }, [notificationId]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    if (reason === 'swipeaway') {
      dismissNotification(notificationId);
      return;
    }
    setOpen(false);
    setTimeout(() => dismissNotification(notificationId), 500);
  };

  return (
    <SwipeableListItem
      swipeRight={{
        content: <span />,
        action: (event) => handleClose(event, 'swipeaway'),
      }}
      swipeLeft={{
        content: <span />,
        action: (event) => handleClose(event, 'swipeaway'),
      }}
      threshold={0.3}
    >
      <Snackbar
        className={classes.notification}
        open={open}
        onClose={handleClose}
        autoHideDuration={timeout}
      >
        <SnackbarContent
          className={clsx(classes.content, classes[variant])}
          message={(
            <span className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          )}
          action={[
            <IconButton key="close" onClick={handleClose}>
              <Close className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </SwipeableListItem>
  );
};

Notification.defaultProps = {
  variant: 'info',
  timeout: 3000,
};

Notification.propTypes = {
  /** The message content (text) */
  message: PropTypes.string.isRequired,
  /** The uuid of the notification */
  notificationId: PropTypes.string.isRequired,
  /** A function used to dismiss the notification */
  dismissNotification: PropTypes.func.isRequired,
  /** The notification vatiant */
  variant: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  /** How long the notification should display before auto-dismissing */
  timeout: PropTypes.number,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps, ...dispatchProps, ...ownProps,
});

export default connect(null, { dismissNotification }, mergeProps)(Notification);
