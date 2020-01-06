import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { configureStore as createStore, combineReducers } from '@reduxjs/toolkit';

import {
  config,
  modifiers,
  notifications,
  simulations,
  stats,
  target,
  targetModifiers,
  units,
} from './slices';

export const appReducer = combineReducers({
  config: config.reducer,
  modifiers: modifiers.reducer,
  notifications: notifications.reducer,
  simulations: simulations.reducer,
  stats: stats.reducer,
  target: target.reducer,
  targetModifies: targetModifiers.reducer,
  units: units.reducer,
});

export const configureSampleStore = (initialState = {}) => {
  const store = createStore({
    reducer: appReducer,
    preloadedState: initialState,
  });
  return store;
};

const persistConfig = {
  key: 'aos-statshammer-12-12-19',
  storage,
  whitelist: ['units', 'config', 'target'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const configureStore = () => {
  const store = createStore({
    reducer: persistedReducer,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
