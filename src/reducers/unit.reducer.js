import {
  TOGGLE_WEAPON_PROFILE, EDIT_WEAPON_PROFILE, ADD_WEAPON_PROFILE, DELETE_WEAPON_PROFILE
} from "./../actions/unit.action";

const DEFAULT_UNIT = {
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

const weaponProfiles = (state, action) => {
  switch (action.type) {
    case TOGGLE_WEAPON_PROFILE:
      return state.map((profile, index) => {
        if (index === action.payload.id) {
          return {
            ...profile,
            active: !profile.active
          }
        }
        return profile
      })
    case EDIT_WEAPON_PROFILE:
      return state.map((profile, index) => {
        if (index === action.payload.id) {
          return action.payload.profile
        }
        return profile
      })
    case ADD_WEAPON_PROFILE:
      return [
        ...state,
        action.payload.profile
      ]
    case DELETE_WEAPON_PROFILE:
      return state.filter((_, index) => {
        return index !== action.payload.id
      })
    default:
      return state
  }
}


const unit = (state = DEFAULT_UNIT, action) => {
  switch (action.type) {
    case TOGGLE_WEAPON_PROFILE:
    case EDIT_WEAPON_PROFILE:
    case ADD_WEAPON_PROFILE:
    case DELETE_WEAPON_PROFILE:
      return {
        ...state,
        weapon_profiles: weaponProfiles(state.weapon_profiles, action)
      };
    default:
      return state
  }
}


export default unit
