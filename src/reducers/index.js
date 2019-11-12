import { combineReducers } from 'redux';
import stats from "./stats.reducer"
import unit from "./unit.reducer";
import modifiers from "./modifiers.reducer";

const appReducer = combineReducers({
  unit,
  stats,
  modifiers
})

export default appReducer
