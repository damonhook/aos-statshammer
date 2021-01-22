import React from 'react'
import { useSelector } from 'react-redux'
import Store from 'types/store'

import Notification from './Notification'

const Notifier = () => {
  const notifications = useSelector((store: Store) => store.notifications.items)
  const activeNotification = notifications[0]

  return (
    <>
      {activeNotification && <Notification key={activeNotification.id} notification={activeNotification} />}
    </>
  )
}

export default Notifier
