import appConfig from 'appConfig';
import _ from 'lodash';
import { createSelector } from 'reselect';
import { IStore } from 'types/store';

/** Get the current units state */
export const unitsSelector = (state: IStore) => state.units;

/** Retrieve a unit by its index in the array */
export const unitByIndexSelector = createSelector(unitsSelector, units =>
  _.memoize((index: number) => units[index]),
);

/** Retrieve the number of units in the current state */
export const numUnitsSelector = createSelector(unitsSelector, units => units.length);

/** Retrieve whether the add unit buttons should be enabled or not (has the limit been reached) */
export const addUnitEnabledSelector = (state: IStore) => numUnitsSelector(state) < appConfig.limits.units;

/** Retrieve a units index by its UUID field */
export const unitIndexByUuidSelector = createSelector(unitsSelector, units =>
  _.memoize((uuid: string) => units.findIndex(unit => unit.uuid === uuid)),
);

/** Retrieve a unit by its UUID field */
export const unitByUuidSelector = createSelector(unitsSelector, unitIndexByUuidSelector, (units, findIndex) =>
  _.memoize((uuid: string) => units[findIndex(uuid)]),
);

/** Retrieve a list of the unit names */
export const unitNamesSelector = (state: IStore) => state.units.map(({ name }) => name);
