import { createSlice } from '@reduxjs/toolkit';
import nanoid from 'nanoid';
import { INotificationParameters } from 'types/notification';
import { INotificationsStore } from 'types/store';

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
