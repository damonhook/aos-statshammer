import { makeStyles, Slide, SlideProps, Snackbar, SnackbarOrigin, Theme } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useIsMobile } from 'hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationsStore } from 'store/slices'
import { Notification as TNotification, NotificationVariant } from 'types/store/notifications'

interface StyleProps {
  variant: NotificationVariant
}

const useStyles = makeStyles((theme: Theme) => ({
  notification: {
    minWidth: 400,
    top: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(2)}px)`,
    [theme.breakpoints.down('sm')]: {
      top: 'unset',
      bottom: 64,
    },
  },
  content: ({ variant }: StyleProps) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
      borderLeft: `4px solid ${theme.palette[variant].main}`,
    },
  }),
  message: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const Transition = (props: SlideProps) => <Slide {...props} direction="left" />

interface NotificationProps {
  notification: TNotification
  timeout?: number
}

const Notification = ({ notification, timeout = 4000 }: NotificationProps) => {
  const classes = useStyles({ variant: notification.variant ?? 'info' })
  const [open, setOpen] = useState(true)
  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  useEffect(() => {
    setOpen(true)
  }, [notification.id])

  const handleClose = (e: any, reason?: string) => {
    if (reason === 'clickaway') return
    const time = reason === 'swipeaway' || reason === 'actioned' ? 0 : 500
    setOpen(false)
    setTimeout(
      () =>
        dispatch(
          notificationsStore.actions.dismissNotification({
            id: notification.id,
          })
        ),
      time
    )
  }

  const anchorOrigin: SnackbarOrigin = useMemo(() => {
    if (isMobile)
      return {
        vertical: 'bottom',
        horizontal: 'center',
      }
    return {
      vertical: 'top',
      horizontal: 'right',
    }
  }, [isMobile])

  return (
    <Snackbar
      className={classes.notification}
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={timeout}
      TransitionComponent={!isMobile ? Transition : undefined}
    >
      <Alert
        severity={notification.variant ?? 'info'}
        onClose={handleClose}
        className={classes.content}
        classes={{ message: classes.message }}
      >
        {notification.details ? (
          <>
            <AlertTitle>{notification.message}</AlertTitle>
            {notification.details}
          </>
        ) : (
          notification.message
        )}
      </Alert>
    </Snackbar>
  )
}

export default Notification
