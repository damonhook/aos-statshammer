import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { Close, CheckCircle, Warning, Error as ErrorIcon, Info } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { notifications } from 'store/slices';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { TNotificationVariants } from 'types/notification';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info,
};

const useStyles = makeStyles(theme => ({
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

const connector = connect(null, {
  dismissNotification: notifications.actions.dismissNotification,
});
interface INotificationProps extends ConnectedProps<typeof connector> {
  message: string;
  notificationId: string;
  variant: TNotificationVariants;
  timeout?: number | null;
}

/**
 * A single notification snackbar
 */
const Notification: React.FC<INotificationProps> = ({
  message,
  notificationId,
  dismissNotification,
  variant = 'info',
  timeout = 3000,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const Icon = variantIcon[variant];

  useEffect(() => {
    setOpen(true);
  }, [notificationId]);

  const handleClose = reason => {
    if (reason === 'clickaway') return;
    if (reason === 'swipeaway') {
      if (dismissNotification) dismissNotification({ key: notificationId });
      return;
    }
    setOpen(false);
    if (dismissNotification) setTimeout(() => dismissNotification({ key: notificationId }), 500);
  };

  return (
    <SwipeableListItem
      swipeRight={{
        content: <span />,
        action: () => handleClose('swipeaway'),
      }}
      swipeLeft={{
        content: <span />,
        action: () => handleClose('swipeaway'),
      }}
      threshold={0.3}
    >
      <Snackbar className={classes.notification} open={open} onClose={handleClose} autoHideDuration={timeout}>
        <SnackbarContent
          className={clsx(classes.content, classes[variant])}
          message={
            <span className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
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

export default connector(Notification);
