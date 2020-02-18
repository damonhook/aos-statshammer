import { createSelector } from 'reselect';
import { IStore } from 'types/store';

/** Get the current target state */
export const targetSelector = (state: IStore) => state.target;

export const targetAppliedModifiersSelector = createSelector(targetSelector, ({ modifiers }) => modifiers);

export const getSanitizedTargetSelector = createSelector(targetSelector, target => ({
  ...target,
  modifiers: target.modifiers.filter(modifier => (modifier.active ?? true) && !modifier.error),
}));
