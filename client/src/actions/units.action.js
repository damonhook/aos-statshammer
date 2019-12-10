import { DEFAULT_WEAPON_PROFILE } from './weaponProfiles.action';

export const ADD_UNIT = 'ADD_UNIT';
export const DELETE_UNIT = 'DELETE_UNIT';
export const EDIT_UNIT_NAME = 'EDIT_UNIT_NAME';
export const CLEAR_ALL_UNITS = 'CLEAR_ALL_UNITS';

export const addUnit = (name, weapon_profiles = [DEFAULT_WEAPON_PROFILE]) => ({
  type: ADD_UNIT,
  unit: {
    name,
    weapon_profiles,
  },
});

export const deleteUnit = (unitId) => ({
  type: DELETE_UNIT,
  unitId,
});

export const editUnitName = (unitId, name) => ({
  type: EDIT_UNIT_NAME,
  unitId,
  name,
});

export const clearAllUnits = () => ({
  type: CLEAR_ALL_UNITS,
});
