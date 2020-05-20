import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import type { IUnitStore } from 'types/store';
import type { IUnitParameter, IWeaponProfileParameter } from 'types/unit';
import { moveItemInArray } from 'utils/arrayUpdates';

const DEFAULT_WEAPON_PROFILE: IWeaponProfileParameter = {
  active: true,
  num_models: 1,
  attacks: 1,
  to_hit: 4,
  to_wound: 4,
  rend: 0,
  damage: 1,
  modifiers: [],
};

const INITIAL_STATE: IUnitStore = [
  {
    name: 'Unit 1',
    uuid: nanoid(),
    weapon_profiles: [{ ...DEFAULT_WEAPON_PROFILE, uuid: nanoid() }],
  },
];

export const addUnit = (
  state: IUnitStore,
  action: { payload: { unit: IUnitParameter; atPosition?: number | null } },
) => {
  const { name, weapon_profiles } = action.payload.unit;
  const { atPosition } = action.payload;
  const profiles = weapon_profiles ?? [DEFAULT_WEAPON_PROFILE];
  const unit = {
    name,
    uuid: nanoid(),
    weapon_profiles: profiles.map((profile) => ({
      ...profile,
      uuid: nanoid(),
    })),
  };
  if (typeof atPosition === 'number' && atPosition >= 0 && atPosition < state.length) {
    state.splice(atPosition, 0, unit);
  } else {
    state.push(unit);
  }
};

export const deleteUnit = (state: IUnitStore, action: { payload: { index: number } }) => {
  const { index } = action.payload;
  return state.filter((_, i) => i !== index);
};

export const editUnitName = (state: IUnitStore, action: { payload: { index: number; name: string } }) => {
  const { index, name } = action.payload;
  const unit = state[index];
  if (unit) {
    unit.name = name;
  }
};

export const clearAllUnits = () => {
  return [];
};

export const moveUnit = (state: IUnitStore, action: { payload: { index: number; newIndex: number } }) => {
  const { index, newIndex } = action.payload;
  return moveItemInArray(state, index, newIndex, (newState) => {
    return newState;
  });
};

export const addWeaponProfile = (
  state: IUnitStore,
  action: { payload: { index: number; weaponProfile?: IWeaponProfileParameter; atPosition?: number | null } },
) => {
  const { index, weaponProfile, atPosition } = action.payload;
  const profile = weaponProfile ?? DEFAULT_WEAPON_PROFILE;
  const unit = state.find((_, i) => i === index);
  if (unit) {
    const newProfile = {
      ...profile,
      uuid: nanoid(),
    };
    if (typeof atPosition === 'number' && atPosition >= 0 && atPosition < unit.weapon_profiles.length) {
      unit.weapon_profiles.splice(atPosition, 0, newProfile);
    } else {
      unit.weapon_profiles.push(newProfile);
    }
  }
};

export const toggleWeaponProfile = (
  state: IUnitStore,
  action: { payload: { index: number; profileIndex: number } },
) => {
  const { index, profileIndex } = action.payload;
  const unit = state.find((_, i) => i === index);
  if (unit) {
    const profile = unit.weapon_profiles.find((_, i) => i === profileIndex);
    if (profile) {
      profile.active = !profile.active;
    }
  }
};

export const editWeaponProfile = (
  state: IUnitStore,
  action: { payload: { index: number; profileIndex: number; weaponProfile: IWeaponProfileParameter } },
) => {
  const { index, profileIndex, weaponProfile } = action.payload;
  const unit = state.find((_, i) => i === index);
  if (unit) {
    let profile = unit.weapon_profiles.find((_, i) => i === profileIndex);
    if (profile) {
      profile = { ...profile, ...weaponProfile };
      unit.weapon_profiles[profileIndex] = profile;
    }
  }
};

export const deleteWeaponProfile = (
  state: IUnitStore,
  action: { payload: { index: number; profileIndex: number } },
) => {
  const { index, profileIndex } = action.payload;
  const unit = state.find((_, i) => i === index);
  if (unit) {
    unit.weapon_profiles = unit.weapon_profiles.filter((_, i) => i !== profileIndex);
  }
};

const moveWeaponProfile = (
  state: IUnitStore,
  action: { payload: { index: number; profileIndex: number; newProfileIndex: number } },
) => {
  const { index, profileIndex, newProfileIndex } = action.payload;
  const unit = state.find((_, i) => i === index);
  if (unit) {
    moveItemInArray(unit.weapon_profiles, profileIndex, newProfileIndex, (newProfiles) => {
      unit.weapon_profiles = newProfiles;
    });
  }
};

export const unitsStore = createSlice({
  name: 'units',
  initialState: INITIAL_STATE,
  reducers: {
    addUnit,
    deleteUnit,
    editUnitName,
    clearAllUnits,
    moveUnit,
    addWeaponProfile,
    toggleWeaponProfile,
    editWeaponProfile,
    deleteWeaponProfile,
    moveWeaponProfile,
  },
});
