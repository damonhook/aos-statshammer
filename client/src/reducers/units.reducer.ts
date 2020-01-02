import nanoid from 'nanoid';
import {
  ADD_UNIT,
  DELETE_UNIT,
  EDIT_UNIT_NAME,
  CLEAR_ALL_UNITS,
  MOVE_UNIT,
} from '../actions/units.action';
import { DEFAULT_WEAPON_PROFILE } from '../actions/weaponProfiles.action';
import weaponProfilesReducer from './weaponProfiles.reducer';
import { updateItemInArray, moveItemInArray } from './helpers';

const DEFAULT_UNIT = {
  name: 'Unit 1',
  weapon_profiles: [
    {
      ...DEFAULT_WEAPON_PROFILE,
      uuid: nanoid(),
    },
  ],
};

const INITIAL_STATE = [{ ...DEFAULT_UNIT, uuid: nanoid() }];

const addUnit = (state, action) => [
  ...state,
  {
    ...action.unit,
    uuid: nanoid(),
    weapon_profiles: action.unit.weapon_profiles.map(profile => ({
      ...profile,
      uuid: nanoid(),
    })),
  },
];

const deleteUnit = (state, action) => state.filter((_, index) => index !== action.unitId);

const editUnitName = (state, action) =>
  updateItemInArray(state, action.unitId, unit => ({
    ...unit,
    name: action.name,
  }));

const clearAllUnits = () => [];

const moveUnit = (state, action) =>
  moveItemInArray(state, action.index, action.newIndex, newState => newState);

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
    case CLEAR_ALL_UNITS:
      return clearAllUnits(state, action);
    case MOVE_UNIT:
      return moveUnit(state, action);
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
