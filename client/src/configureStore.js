import { createStore, applyMiddleware } from 'redux';
import appReducer from 'reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const middlewares = [thunk];

const configureSampleStore = (initialState = {}) => (
  createStore(appReducer, initialState, applyMiddleware(...middlewares))
);

const persistConfig = {
  key: 'aosStatshammer',
  storage,
  whitelist: ['units'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const configureStore = (initialState = {}) => {
  const store = createStore(persistedReducer, initialState, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
};

export { configureStore as default, configureSampleStore };
