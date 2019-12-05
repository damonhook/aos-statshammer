export const TOGGLE_WEAPON_PROFILE = 'TOGGLE_WEAPON_PROFILE';
export const EDIT_WEAPON_PROFILE = 'EDIT_WEAPON_PROFILE';
export const ADD_WEAPON_PROFILE = 'ADD_WEAPON_PROFILE';
export const DELETE_WEAPON_PROFILE = 'DELETE_WEAPON_PROFILE';

export const toggleWeaponProfile = (id, unitId = 0) => ({
  type: TOGGLE_WEAPON_PROFILE,
  id,
  unitId,
});

export const editWeaponProfile = (id, profile, unitId = 0) => ({
  type: EDIT_WEAPON_PROFILE,
  id,
  profile,
  unitId,
});


const DEFAULT_WEAPON_PROFILE = {
  active: true,
  num_models: 1,
  attacks: 1,
  to_hit: 4,
  to_wound: 4,
  rend: 0,
  damage: 1,
};
export const addWeaponProfile = (unitId, profile = DEFAULT_WEAPON_PROFILE) => ({
  type: ADD_WEAPON_PROFILE,
  profile,
  unitId,
});

export const deleteWeaponProfile = (id, unitId = 0) => ({
  type: DELETE_WEAPON_PROFILE,
  id,
  unitId,
});


export const ADD_UNIT = 'ADD_UNIT';
export const DELETE_UNIT = 'DELETE_UNIT';
export const EDIT_UNIT_NAME = 'EDIT_UNIT_NAME';

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
