export const TOGGLE_WEAPON_PROFILE = "TOGGLE_WEAPON_PROFILE";
export const EDIT_WEAPON_PROFILE = "EDIT_WEAPON_PROFILE";
export const ADD_WEAPON_PROFILE = "ADD_WEAPON_PROFILE";
export const DELETE_WEAPON_PROFILE = "DELETE_WEAPON_PROFILE";

export const toggleWeaponProfile = (id, unit_id = 0) => ({
  type: TOGGLE_WEAPON_PROFILE,
  id,
  unit_id
})

export const editWeaponProfile = (id, profile, unit_id = 0) => ({
  type: EDIT_WEAPON_PROFILE,
  id,
  profile,
  unit_id
})


const DEFAULT_WEAPON_PROFILE = {
  active: true,
  num_models: 1,
  attacks: 1,
  to_hit: 4,
  to_wound: 4,
  rend: 0,
  damage: 1
}
export const addWeaponProfile = (unit_id, profile = DEFAULT_WEAPON_PROFILE) => ({
  type: ADD_WEAPON_PROFILE,
  profile,
  unit_id
})

export const deleteWeaponProfile = (id, unit_id = 0) => ({
  type: DELETE_WEAPON_PROFILE,
  id,
  unit_id
})


export const ADD_UNIT = "ADD_UNIT";

export const addUnit = (name) => ({
  type: ADD_UNIT,
  unit: {
    name: name,
    weapon_profiles: [DEFAULT_WEAPON_PROFILE]
  }
})

