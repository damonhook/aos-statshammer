export const TOGGLE_WEAPON_PROFILE = "TOGGLE_WEAPON_PROFILE";
export const EDIT_WEAPON_PROFILE = "EDIT_WEAPON_PROFILE";
export const ADD_WEAPON_PROFILE = "ADD_WEAPON_PROFILE";
export const DELETE_WEAPON_PROFILE = "DELETE_WEAPON_PROFILE";

export const toggleWeaponProfile = (id) => ({
  type: TOGGLE_WEAPON_PROFILE,
  payload: { id }
})

export const editWeaponProfile = (id, profile) => ({
  type: EDIT_WEAPON_PROFILE,
  payload: { id, profile }
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
export const addWeaponProfile = (profile = DEFAULT_WEAPON_PROFILE) => ({
  type: ADD_WEAPON_PROFILE,
  payload: { profile }
})

export const deleteWeaponProfile = (id) => ({
  type: DELETE_WEAPON_PROFILE,
  payload: { id }
})
