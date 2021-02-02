import { createSelector } from 'reselect'
import type Store from 'types/store'

export const targetSelector = (state: Store) => state.target

export const targetModifiersSelector = createSelector(targetSelector, ({ modifiers }) => modifiers)

export const activeTargetSelector = createSelector(targetSelector, ({ modifiers, errors, ...rest }) => {
  const errorKeys = Object.keys(errors?.modifiers ?? {})
  return { ...rest, modifiers: modifiers.filter(m => !m.disabled).filter(m => !errorKeys.includes(m.id)) }
})

export const activeTargetModifiersSelector = createSelector(
  activeTargetSelector,
  ({ modifiers }) => modifiers
)
