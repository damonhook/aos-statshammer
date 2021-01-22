import { combineReducers, configureStore as createStore, Middleware } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import Store from 'types/store'
import FormsStore from 'types/store/forms'

import customMiddleware from './middleware'
import {
  comparisonStore,
  configStore,
  modifiersStore,
  notificationsStore,
  targetStore,
  unitsStore,
} from './slices'
import { profileFormStore, unitFormStore } from './slices/forms'

export const formsReducer = combineReducers<FormsStore>({
  unit: unitFormStore.reducer,
  weaponProfile: profileFormStore.reducer,
})

export const appReducer = combineReducers<Store>({
  modifiers: modifiersStore.reducer,
  units: unitsStore.reducer,
  target: targetStore.reducer,
  comparison: comparisonStore.reducer,
  config: configStore.reducer,
  notifications: notificationsStore.reducer,
  forms: formsReducer,
})

const middleware: Middleware[] = [thunk, ...customMiddleware]

const persistConfig = {
  key: 'aos-statshammer-3.0.0',
  storage,
  whitelist: ['units', 'config', 'target'],
}

const persistedReducer = persistReducer<Store>(persistConfig, appReducer)

const configureStore = () => {
  const store = createStore({
    reducer: persistedReducer,
    middleware,
  })
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
