// eslint-disable-next-line import/prefer-default-export
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
