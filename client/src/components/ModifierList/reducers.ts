// eslint-disable-next-line import/prefer-default-export
export const errorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return [...state, action.err];
    case 'SET_ERROR':
      return state.map((err, index) => {
        if (index === action.index) return action.error;
        return err;
      });
    case 'REMOVE_ERROR':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};
