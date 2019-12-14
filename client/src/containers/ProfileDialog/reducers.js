import { moveItemInArray, updateItemInArray } from 'reducers/helpers';
import nanoid from 'nanoid';

export const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        [action.name]: action.error,
      };
    default:
      return state;
  }
};

const modifiersReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_PROFILE':
      if (action.modifiers && action.modifiers.length) {
        return action.modifiers.map((mod) => ({
          ...mod,
          uuid: mod.uuid || nanoid(),
        }));
      }
      return [];
    case 'ADD_MODIFIER':
      if (state && state.length) {
        return [
          ...state,
          { ...action.modifier, uuid: nanoid() },
        ];
      }
      return [{ ...action.modifier, uuid: nanoid() }];
    case 'REMOVE_MODIFIER':
      return state.filter((_, index) => index !== action.index);
    case 'MOVE_MODIFIER':
      return moveItemInArray(state, action.index, action.newIndex, (state) => state);
    case 'EDIT_MODIFIER':
      return updateItemInArray(state, action.index, (item) => ({
        ...item,
        ...action.item,
      }));
    case 'EDIT_MODIFIER_OPTION':
      return updateItemInArray(state, action.index, (item) => ({
        ...item,
        options: {
          ...item.options,
          [action.name]: action.value,
        },
      }));
    default:
      return state;
  }
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_PROFILE':
      return {
        num_models: action.profile.num_models,
        attacks: action.profile.attacks,
        to_hit: action.profile.to_hit,
        to_wound: action.profile.to_wound,
        rend: action.profile.rend,
        damage: action.profile.damage,
        modifiers: modifiersReducer([], { type: action.type, ...action.profile }),
      };
    case 'SET_PROFILE':
      return {
        ...state,
        [action.name]: action.val,
      };
    case 'ADD_MODIFIER':
    case 'REMOVE_MODIFIER':
    case 'MOVE_MODIFIER':
    case 'EDIT_MODIFIER':
    case 'EDIT_MODIFIER_OPTION':
      return {
        ...state,
        modifiers: modifiersReducer(state.modifiers, action),
      };
    default:
      return state;
  }
};
