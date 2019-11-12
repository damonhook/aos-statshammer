import {
  TOGGLE_WEAPON_PROFILE, EDIT_WEAPON_PROFILE, ADD_WEAPON_PROFILE, DELETE_WEAPON_PROFILE, ADD_UNIT
} from "../actions/units.action";

const DEFAULT_UNIT = {
  name: "Unit 1",
  weapon_profiles: [
    {
      active: true,
      num_models: 20,
      attacks: 2,
      to_hit: 3,
      to_wound: 4,
      rend: 1,
      damage: 1,
      modifiers: []
    }
  ]
}

const updateItemInArray = (array, index, callback) => {
  return array.map((item, i) => {
    if (i === index) {
      return callback(item)
    }
    return item
  })
}

const addWeaponProfile = (state, action) => {
  return [
    ...state,
    { ...action.profile }
  ]
}

const toggleWeaponProfile = (state, action) => {
  return updateItemInArray(state, action.id, (profile) => ({
    ...profile,
    active: !profile.active
  }))
}

const editWeaponProfile = (state, action) => {
  return updateItemInArray(state, action.id, (_) => action.profile)
}

const deleteWeaponProfile = (state, action) => {
  return state.filter((_, index) => {
    return index !== action.id
  })
}

const weaponProfilesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_WEAPON_PROFILE:
      return toggleWeaponProfile(state, action)
    case EDIT_WEAPON_PROFILE:
      return editWeaponProfile(state, action)
    case ADD_WEAPON_PROFILE:
      return addWeaponProfile(state, action)
    case DELETE_WEAPON_PROFILE:
      return deleteWeaponProfile(state, action)
    default:
      return state
  }
}

const unitReducer = (state = DEFAULT_UNIT, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        weapon_profiles: weaponProfilesReducer(state.weapon_profiles, action)
      };
  }
}

const unitsReducer = (state = [DEFAULT_UNIT], action) => {
  switch (action.type) {
    case ADD_UNIT:
      return [
        ...state,
        action.unit
      ]
    default:
      if (action && typeof action.unit_id == "number") {
        return state.map((unit, index) => {
          if (index === action.unit_id) {
            return unitReducer(unit, action)
          }
          return unit
        })
      }
      return state
  }
}

export default unitsReducer
