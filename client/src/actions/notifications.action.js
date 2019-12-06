export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';
export const DISMISS_ALL_NOTIFICATIONS = 'DISMISS_ALL_NOTIFICATIONS';

export const addNotification = ({ message, variant = 'info' }) => ({
  type: ADD_NOTIFICATION,
  notification: {
    message,
    variant,
  },
});

export const dismissNotification = (key) => ({
  type: DISMISS_NOTIFICATION,
  key,
});

export const dismissAllNotifications = () => ({
  type: DISMISS_ALL_NOTIFICATIONS,
});
