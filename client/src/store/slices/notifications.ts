import nanoid from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { INotificationsStore } from 'types/store';
import { INotificationParameters, TNotificationVariants } from 'types/notification';

const INITIAL_STATE: INotificationsStore = [];

const addNotification = (state: INotificationsStore, action: { payload: INotificationParameters }) => {
  const notification = action.payload;
  if (!notification.variant) notification.variant = 'info';
  state.push({
    ...action.payload,
    key: nanoid(),
  });
};

const dismissNotification = (state: INotificationsStore, action: { payload: { key: string } }) => {
  state = state.filter(n => n.key !== action.payload.key);
};

const dismissAllNotifications = (state: INotificationsStore) => {
  state = [];
};

export const notifications = createSlice({
  name: 'notifications',
  initialState: INITIAL_STATE,
  reducers: {
    addNotification,
    dismissNotification,
    dismissAllNotifications,
  },
});
