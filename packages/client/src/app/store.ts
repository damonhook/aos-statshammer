import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import units from 'features/Units/unitsSlice'

import { statshammerApi } from './services/statshammer'

export const rootReducer = combineReducers({
  units,
  [statshammerApi.reducerPath]: statshammerApi.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(statshammerApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch

export default store
