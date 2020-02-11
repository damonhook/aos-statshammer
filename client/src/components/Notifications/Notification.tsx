import { Button, IconButton, Snackbar, SnackbarContent, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle, Close, Error as ErrorIcon, Info, Warning } from '@material-ui/icons';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import clsx from 'clsx';
import { useIsMobile } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notifications as notificationsStore } from 'store/slices';
import { INotificationAction, TNotificationVariants } from 'types/notification';

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
    [theme.breakpoints.down('sm')]: {
      bottom: 90,
      minWidth: '85%',
    },
  },
  inner: {
    flex: 1,
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

interface INotificationProps {
  message: string;
  notificationId: string;
  variant: TNotificationVariants;
  action?: INotificationAction;
  timeout?: number | null;
}

/**
 * A single notification snackbar
 */
const Notification = ({
  message,
  notificationId,
  variant = 'info',
  action,
  timeout = 3000,
}: INotificationProps) => {
  const classes = useStyles({ variant });
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const mobile = useIsMobile();
  const Icon = variantIcon[variant];

  useEffect(() => {
    setOpen(true);
  }, [notificationId]);

  const handleClose = (event: any, reason?: string) => {
    if (reason === 'clickaway') return;
    const t = reason === 'swipeaway' || reason === 'actioned' ? 0 : 500;
    setOpen(false);
    setTimeout(() => dispatch(notificationsStore.actions.dismissNotification({ key: notificationId })), t);
  };

  const handleAction = () => {
    if (action?.onClick) action.onClick();
    handleClose(null, 'actioned');
  };

  let actionElement: React.ReactNode | null = null;
  if (action?.label && action?.onClick) {
    actionElement = (
      <Button onClick={handleAction} className={classes.action} key={action.label}>
        {action.label}
      </Button>
    );
  }

  const swipeAction = {
    content: <span />,
    action: () => handleClose(null, 'swipeaway'),
  };

  return (
    <Snackbar
      className={classes.notification}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: mobile ? 'center' : 'left',
      }}
      autoHideDuration={timeout}
    >
      <div className={classes.inner}>
        <SwipeableListItem swipeRight={swipeAction} swipeLeft={swipeAction} threshold={0.3}>
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
        </SwipeableListItem>
      </div>
    </Snackbar>
  );
};

export default Notification;
