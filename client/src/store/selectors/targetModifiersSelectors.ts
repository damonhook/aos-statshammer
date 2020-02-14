import _ from 'lodash';
import { createSelector } from 'reselect';
import { IStore } from 'types/store';

/**
 * Get the current list of target modifiers
 */
export const targetModifiersSelector = (state: IStore) => state.targetModifiers.modifiers;

/**
 * Retrieve a target modifier by its ID
 */
export const targetModifierByIdSelector = createSelector(targetModifiersSelector, modifiers =>
  _.memoize((id: string) => modifiers.find(mod => mod.id === id)),
);
