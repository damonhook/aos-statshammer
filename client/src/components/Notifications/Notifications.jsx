import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Notification from './Notification';

const useStyles = makeStyles({
  notifications: {
    position: 'fixed',
    right: 'auto',
    bottom: '24px',
    padding: '0 1em',
  },
  mobile: {
    left: 0,
    right: 0,
    paddingLeft: 0,
    paddingBottom: '50px',
  },
});

const Notifications = ({ notifications }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={clsx(classes.notifications, mobile ? classes.mobile : '')}>
      {notifications.map((notification) => (
        <Notification
          message={notification.message}
          notificationId={notification.key}
          key={notification.key}
          variant={notification.variant}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notifications);
