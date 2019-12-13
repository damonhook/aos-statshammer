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
        modifiers: action.profile.modifiers,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        [action.name]: action.val,
      };
    default:
      return state;
  }
};
