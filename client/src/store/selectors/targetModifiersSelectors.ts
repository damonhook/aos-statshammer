import _ from 'lodash';
import { createSelector } from 'reselect';
import { IStore } from 'types/store';

export const targetModifiersSelector = (state: IStore) => state.targetModifiers;

/** Get the current list of target modifier items */
export const targetModifierItemsSelector = createSelector(targetModifiersSelector, ({ items }) => items);

/** Retrieve a target modifier by its ID */
export const targetModifierByIdSelector = createSelector(targetModifierItemsSelector, modifiers =>
  _.memoize((id: string) => modifiers.find(mod => mod.id === id)),
);
