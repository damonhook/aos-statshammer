export const TOGGLE_WEAPON_PROFILE = 'TOGGLE_WEAPON_PROFILE';
export const EDIT_WEAPON_PROFILE = 'EDIT_WEAPON_PROFILE';
export const ADD_WEAPON_PROFILE = 'ADD_WEAPON_PROFILE';
export const DELETE_WEAPON_PROFILE = 'DELETE_WEAPON_PROFILE';
export const MOVE_WEAPON_PROFILE = 'MOVE_WEAPON_PROFILE';

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


export const DEFAULT_WEAPON_PROFILE = {
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

export const moveWeaponProfile = (index, newIndex, unitId = 0) => ({
    type: MOVE_WEAPON_PROFILE,
    index,
    newIndex,
    unitId,
  });
