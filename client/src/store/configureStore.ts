import { combineReducers, configureStore as createStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

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
  targetModifiers: targetModifiers.reducer,
  units: units.reducer,
});

const middleware: Middleware[] = [thunk];

const persistConfig = {
  key: 'aos-statshammer-12-12-19',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['units', 'config', 'target'],
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, appReducer);

const configureStore = () => {
  const store = createStore({
    reducer: persistedReducer,
    middleware,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
