import { createStore, applyMiddleware } from 'redux';
import appReducer from 'reducers/index';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const configureStore = (initialState = {}) => (
  createStore(appReducer, initialState, applyMiddleware(...middlewares))
);

export default configureStore;
