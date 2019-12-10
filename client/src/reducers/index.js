import { combineReducers } from 'redux';
import stats from './stats.reducer';
import unitsReducer from './units.reducer';
import modifiers from './modifiers.reducer';
import notificationsReducer from './notifications.reducer';
import configReducer from './config.reducer';

const appReducer = combineReducers({
  units: unitsReducer,
  stats,
  modifiers,
  notifications: notificationsReducer,
  config: configReducer,
});

export default appReducer;
