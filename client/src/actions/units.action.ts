import { DEFAULT_WEAPON_PROFILE } from './weaponProfiles.action';

export const ADD_UNIT = 'ADD_UNIT';
export const DELETE_UNIT = 'DELETE_UNIT';
export const EDIT_UNIT_NAME = 'EDIT_UNIT_NAME';
export const CLEAR_ALL_UNITS = 'CLEAR_ALL_UNITS';
export const MOVE_UNIT = 'MOVE_UNIT';

export const addUnit = (name: string, weapon_profiles = [DEFAULT_WEAPON_PROFILE]) => ({
  type: ADD_UNIT,
  unit: {
    name,
    weapon_profiles,
  },
});

export const deleteUnit = (unitId: number) => ({
  type: DELETE_UNIT,
  unitId,
});

export const editUnitName = (unitId: number, name: string) => ({
  type: EDIT_UNIT_NAME,
  unitId,
  name,
});

export const clearAllUnits = () => ({
  type: CLEAR_ALL_UNITS,
});

export const moveUnit = (index: number, newIndex: number) => ({
  type: MOVE_UNIT,
  index,
  newIndex,
});
