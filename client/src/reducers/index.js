import { combineReducers } from 'redux';
import stats from './stats.reducer';
import unitsReducer from './units.reducer';
import modifiers from './modifiers.reducer';
import notificationsReducer from './notifications.reducer';

const appReducer = combineReducers({
  units: unitsReducer,
  stats,
  modifiers,
  notifications: notificationsReducer,
});

export default appReducer;
