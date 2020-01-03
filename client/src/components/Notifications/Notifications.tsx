import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Notification from './Notification';
import { INotificationsStore, IStore } from 'types/store';

const useStyles = makeStyles(theme => ({
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
    paddingBottom: theme.spacing(11.5),
  },
}));

interface INotificationsProps {
  notifications: INotificationsStore;
}

/**
 * A component used to display the current notifications
 */
const Notifications: React.FC<INotificationsProps> = ({ notifications }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={clsx(classes.notifications, mobile ? classes.mobile : '')}>
      {notifications.map(({ message, key, variant }) => (
        <Notification message={message} notificationId={key} key={key} variant={variant} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: IStore) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notifications);