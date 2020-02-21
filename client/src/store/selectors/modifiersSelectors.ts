import _ from 'lodash';
import { createSelector } from 'reselect';
import { IStore } from 'types/store';

/** Get the current modifiers stat */
export const modifiersSelector = (state: IStore) => state.modifiers;

/** Get the current list of modifier items */
export const modifierItemsSelector = createSelector(modifiersSelector, ({ items }) => items);

/** Retrieve a modifier by its ID */
export const modifierByIdSelector = createSelector(modifierItemsSelector, modifiers =>
  _.memoize((id: string) => modifiers.find(mod => mod.id === id)),
);
