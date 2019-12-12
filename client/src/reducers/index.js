import { combineReducers } from 'redux';
import statsReducer from './stats.reducer';
import unitsReducer from './units.reducer';
import modifiersReducer from './modifiers.reducer';
import notificationsReducer from './notifications.reducer';
import configReducer from './config.reducer';

const appReducer = combineReducers({
  units: unitsReducer,
  stats: statsReducer,
  modifiers: modifiersReducer,
  notifications: notificationsReducer,
  config: configReducer,
});

export default appReducer;
