import { combineReducers } from 'redux';
import stats from './stats.reducer';
import unitsReducer from './units.reducer';
import modifiers from './modifiers.reducer';

const appReducer = combineReducers({
  units: unitsReducer,
  stats,
  modifiers,
});

export default appReducer;
