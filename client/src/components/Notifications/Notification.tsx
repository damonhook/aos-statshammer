import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent, Button, Theme } from '@material-ui/core';
import { Close, CheckCircle, Warning, Error as ErrorIcon, Info } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { notifications } from 'store/slices';
import clsx from 'clsx';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { TNotificationVariants, INotificationAction } from 'types/notification';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info,
};

interface IStyleProps {
  variant: TNotificationVariants;
}
const useStyles = makeStyles((theme: Theme) => ({
  notification: {
    position: 'relative',
    marginTop: '.5em',
    flex: '1 1 auto',
    zIndex: theme.zIndex.snackbar,
  },
  content: ({ variant }: IStyleProps) => ({
    flexWrap: 'nowrap',
    backgroundColor: theme.palette.notifications[variant],
    color: theme.palette.getContrastText(theme.palette.notifications[variant]),
  }),
  icon: ({ variant }: IStyleProps) => ({
    color: theme.palette.getContrastText(theme.palette.notifications[variant]),
    fontSize: 20,
  }),
  action: ({ variant }: IStyleProps) => ({
    color: theme.palette.getContrastText(theme.palette.notifications[variant]),
  }),
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
  action?: INotificationAction;
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
  action,
  timeout = 3000,
}) => {
  const classes = useStyles({ variant });
  const [open, setOpen] = useState(true);
  const Icon = variantIcon[variant];

  useEffect(() => {
    setOpen(true);
  }, [notificationId]);

  const handleClose = (event?: React.SyntheticEvent | null, reason?: string) => {
    if (reason === 'clickaway') return;
    const t = reason === 'swipeaway' || reason === 'actioned' ? 0 : 500;
    setOpen(false);
    if (dismissNotification) setTimeout(() => dismissNotification({ key: notificationId }), t);
  };

  const handleAction = () => {
    if (action?.onClick) action.onClick();
    handleClose(null, 'actioned');
  };

  let actionElement: React.ReactNode | null = null;
  if (action?.label && action?.onClick) {
    actionElement = (
      <Button onClick={handleAction} className={classes.action}>
        {action.label}
      </Button>
    );
  }

  return (
    <SwipeableListItem
      swipeRight={{
        content: <span />,
        action: () => handleClose(null, 'swipeaway'),
      }}
      swipeLeft={{
        content: <span />,
        action: () => handleClose(null, 'swipeaway'),
      }}
      threshold={0.3}
    >
      <Snackbar className={classes.notification} open={open} onClose={handleClose} autoHideDuration={timeout}>
        <SnackbarContent
          className={clsx(classes.content)}
          message={
            <span className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            ...([actionElement] ?? []),
            <IconButton key="close" onClick={handleClose} className={classes.action}>
              <Close className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </SwipeableListItem>
  );
};

export default connector(Notification);
