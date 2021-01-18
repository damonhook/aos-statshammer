import { combineReducers, configureStore as createStore, Middleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import Store, { FormsStore } from 'types/store'
import customMiddleware from './middleware'

import {
  modifiersStore,
  comparisonStore,
  unitsStore,
  targetStore,
  profileFormStore,
  unitFormStore,
} from './slices'

const formsReducer = combineReducers<FormsStore>({
  unit: unitFormStore.reducer,
  weaponProfile: profileFormStore.reducer,
})

export const appReducer = combineReducers<Store>({
  modifiers: modifiersStore.reducer,
  units: unitsStore.reducer,
  target: targetStore.reducer,
  comparison: comparisonStore.reducer,
  forms: formsReducer,
})

const middleware: Middleware[] = [thunk, ...customMiddleware]

const configureStore = () => {
  const store = createStore({
    reducer: appReducer,
    middleware,
  })
  return store
}

export default configureStore
