import { ADD_NOTIFICATION, DISMISS_NOTIFICATION, DISMISS_ALL_NOTIFICATIONS } from 'actions/notifications.action';
import uuid from 'uuid/v4';


const DEFAULT_STATE = [];
const MAX_NOTIFICATIONS = 1;

const addNotification = (state, action) => {
  if (state.length >= MAX_NOTIFICATIONS) {
    return [
      ...state.slice(1),
      {
        key: uuid(),
        ...action.notification,
      },
    ];
  }
  return [
    ...state,
    {
      key: uuid(),
      ...action.notification,
    },
  ];
};

const notificationsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return addNotification(state, action);
    case DISMISS_NOTIFICATION:
      return state.filter((n) => n.key !== action.key);
    case DISMISS_ALL_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
};

export default notificationsReducer;
