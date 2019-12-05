import uuid from 'uuid/v4';
import { ADD_UNIT, DELETE_UNIT, EDIT_UNIT_NAME } from '../actions/units.action';
import { DEFAULT_WEAPON_PROFILE } from '../actions/weaponProfiles.action';
import weaponProfilesReducer from './weaponProfiles.reducer';
import { updateItemInArray } from './helpers';

const DEFAULT_UNIT = {
  name: 'Unit 1',
  weapon_profiles: [{
    ...DEFAULT_WEAPON_PROFILE,
    uuid: uuid(),
  }],
};

const INITIAL_STATE = [{ ...DEFAULT_UNIT, uuid: uuid() }];

const addUnit = (state, action) => [
  ...state,
  {
    ...action.unit,
    uuid: uuid(),
    weapon_profiles: action.unit.weapon_profiles.map((profile) => ({
      ...profile,
      uuid: uuid(),
    })),
  },
];

const deleteUnit = (state, action) => state.filter((_, index) => index !== action.unitId);

const editUnitName = (state, action) => updateItemInArray(state, action.unitId, (unit) => ({
  ...unit,
  name: action.name,
}));

const unitReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        weapon_profiles: weaponProfilesReducer(state.weapon_profiles, action),
      };
  }
};

const unitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNIT:
      return addUnit(state, action);
    case DELETE_UNIT:
      return deleteUnit(state, action);
    case EDIT_UNIT_NAME:
      return editUnitName(state, action);
    default:
      if (action && typeof action.unitId === 'number') {
        return state.map((unit, index) => {
          if (index === action.unitId) {
            return unitReducer(unit, action);
          }
          return unit;
        });
      }
      return state;
  }
};

export default unitsReducer;
