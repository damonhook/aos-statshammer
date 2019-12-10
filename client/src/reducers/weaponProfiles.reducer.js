import nanoid from 'nanoid';
import {
  TOGGLE_WEAPON_PROFILE, EDIT_WEAPON_PROFILE, ADD_WEAPON_PROFILE, DELETE_WEAPON_PROFILE,
} from '../actions/weaponProfiles.action';
import { updateItemInArray } from './helpers';

const addWeaponProfile = (state, action) => [
  ...state,
  { ...action.profile, uuid: nanoid() },
];

const toggleWeaponProfile = (state, action) => updateItemInArray(state, action.id, (profile) => ({
  ...profile,
  active: !profile.active,
}));

const editWeaponProfile = (state, action) => updateItemInArray(state, action.id, (profile) => ({
  ...profile,
  ...action.profile,
}));

const deleteWeaponProfile = (state, action) => state.filter((_, index) => index !== action.id);

const weaponProfilesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_WEAPON_PROFILE:
      return toggleWeaponProfile(state, action);
    case EDIT_WEAPON_PROFILE:
      return editWeaponProfile(state, action);
    case ADD_WEAPON_PROFILE:
      return addWeaponProfile(state, action);
    case DELETE_WEAPON_PROFILE:
      return deleteWeaponProfile(state, action);
    default:
      return state;
  }
};

export default weaponProfilesReducer;
