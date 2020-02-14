import _ from 'lodash';
import { createSelector } from 'reselect';
import { IStore } from 'types/store';

/**
 * Get the current list of modifiers
 */
export const modifiersSelector = (state: IStore) => state.modifiers.modifiers;

/**
 * Retrieve a modifier by its ID
 */
export const modifierByIdSelector = createSelector(modifiersSelector, modifiers =>
  _.memoize((id: string) => modifiers.find(mod => mod.id === id)),
);
