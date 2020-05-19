import appConfig from 'appConfig';
import _ from 'lodash';
import { createSelector } from 'reselect';
import type { IStore } from 'types/store';
import type { IWeaponProfile } from 'types/unit';

/** Get the current units state */
export const unitsSelector = (state: IStore) => state.units;

/** Retrieve a unit by its index in the array */
export const unitByIndexSelector = createSelector(unitsSelector, (units) =>
  _.memoize((index: number) => units[index]),
);

/** Retrieve the number of units in the current state */
export const numUnitsSelector = createSelector(unitsSelector, (units) => units.length);

/** Retrieve whether the add unit buttons should be enabled or not (has the limit been reached) */
export const addUnitEnabledSelector = createSelector(numUnitsSelector, (num) => num < appConfig.limits.units);

/** Retrieve a units index by its UUID field */
export const unitIndexByUuidSelector = createSelector(unitsSelector, (units) =>
  _.memoize((uuid: string) => units.findIndex((unit) => unit.uuid === uuid)),
);

/** Retrieve a unit by its UUID field */
export const unitByUuidSelector = createSelector(unitsSelector, unitIndexByUuidSelector, (units, findIndex) =>
  _.memoize((uuid: string) => units[findIndex(uuid)]),
);

/** Retrieve a list of the unit names */
export const unitNamesSelector = createSelector(unitsSelector, (units) => units.map(({ name }) => name));

export interface ISanitizedUnit {
  name: string;
  weapon_profiles: IWeaponProfile[];
}
export const getSanitizedUnitsSelector = createSelector(unitsSelector, (units) =>
  _.memoize((useUuidAsName: boolean): ISanitizedUnit[] =>
    units.map((unit) => ({
      name: useUuidAsName ? unit.uuid : unit.name,
      weapon_profiles: unit.weapon_profiles
        .filter((profile) => profile.active)
        .map((profile) => ({
          ...profile,
          modifiers: (profile.modifiers ?? []).filter((mod) => mod.active ?? true),
        })),
    })),
  ),
);
