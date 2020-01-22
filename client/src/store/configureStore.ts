import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { configureStore as createStore, combineReducers, Middleware } from '@reduxjs/toolkit';

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
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const persistConfig = {
  key: 'aos-statshammer-12-12-19',
  storage,
  whitelist: ['units', 'config', 'target'],
};

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
