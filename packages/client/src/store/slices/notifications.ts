import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import NotificationsStore, { Notification, NotificationVariant } from 'types/store/notifications'

const MAX_NUM = 1
const INITIAL_STATE: NotificationsStore = {
  items: [],
}

export default createSlice({
  name: 'notifications',
  initialState: INITIAL_STATE,
  reducers: {
    addNotification(state: NotificationsStore, action: PayloadAction<Omit<Notification, 'id'>>) {
      const { title, message, variant } = action.payload
      state.items.push({
        title,
        message,
        variant: variant ?? 'info',
        id: nanoid(),
      })
      if (state.items.length > MAX_NUM) state.items.splice(0, state.items.length - MAX_NUM)
    },
    dismissNotification(state: NotificationsStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state.items = state.items.filter(n => n.id !== id)
    },
    dismissAllNotifications(state: NotificationsStore) {
      state.items = []
    },
  },
})
