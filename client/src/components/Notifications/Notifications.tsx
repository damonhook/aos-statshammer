import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from 'types/store';

import Notification from './Notification';

/**
 * A component used to display the current notifications
 */
const Notifications = () => {
  const notifications = useSelector((state: IStore) => state.notifications);

  return (
    <div>
      {notifications.map(({ message, key, variant, action }) => (
        <Notification message={message} notificationId={key} key={key} variant={variant} action={action} />
      ))}
    </div>
  );
};

export default Notifications;
