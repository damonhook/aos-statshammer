import {
  ActionCreatorWithPayload,
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
} from '@reduxjs/toolkit'
import Store from 'types/store'

export type MiddlewareStore = MiddlewareAPI<Dispatch<AnyAction>, Store>

export const createMiddleware = <T = any>(
  callback: (store: MiddlewareStore, action: PayloadAction<T>) => void,
  onAction?: ActionCreatorWithPayload<T>
): Middleware<unknown, Store> => {
  return store => next => action => {
    const result = next(action)
    if (!onAction || action.type === onAction.type) {
      callback(store, action)
    }
    return result
  }
}
