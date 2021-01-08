import { combineReducers, configureStore as createStore, Middleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { modifiersStore } from './slices'

export const appReducer = combineReducers({
  modifiers: modifiersStore.reducer,
})

const middleware: Middleware[] = [thunk]

const configureStore = () => {
  const store = createStore({
    reducer: appReducer,
    middleware,
  })
  return store
}

export default configureStore
