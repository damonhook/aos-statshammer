import { createStore, applyMiddleware } from 'redux';
import appReducer from 'reducers/index';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const createAppStore = (initialState = {}) => (
  createStore(appReducer, initialState, applyMiddleware(...middlewares))
);

const store = createAppStore();

export { store as default, createAppStore, appReducer };
