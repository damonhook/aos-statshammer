import nanoid from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { INotificationsStore } from 'types/store';
import { INotificationParameters } from 'types/notification';

const INITIAL_STATE: INotificationsStore = [];

const addNotification = (state: INotificationsStore, action: { payload: INotificationParameters }) => {
  const notification = action.payload;
  return [
    {
      ...notification,
      variant: notification.variant || 'info',
      key: nanoid(),
    },
  ];
};

const dismissNotification = (
  state: INotificationsStore,
  action: { payload: { key: string } },
): INotificationsStore => {
  return state.filter(n => n.key !== action.payload.key);
};

const dismissAllNotifications = (): INotificationsStore => {
  return [];
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
