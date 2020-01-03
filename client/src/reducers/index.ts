import { combineReducers } from 'redux';
import statsReducer from './stats.reducer';
import unitsReducer from './units.reducer';
import modifiersReducer from './modifiers.reducer';
import notificationsReducer from './notifications.reducer';
import configReducer from './config.reducer';
import simulationsReducer from './simulations.reducer';
import targetModifiersReducer from './targetModifiers.reducer';
import targetReducer from './target.reducer';

const appReducer = combineReducers({
  units: unitsReducer,
  stats: statsReducer,
  modifiers: modifiersReducer,
  //@ts-ignore
  notifications: notificationsReducer,
  config: configReducer,
  simulations: simulationsReducer,
  targetModifiers: targetModifiersReducer,
  target: targetReducer,
});

export default appReducer;
