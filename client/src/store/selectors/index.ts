import appConfig from 'appConfig';
import { IStore } from 'types/store';

export const getNumUnits = (state: IStore) => state.units.length ?? 0;

export const getAddUnitEnabled = (state: IStore) => getNumUnits(state) < appConfig.limits.units;

export const getUnitNames = (state: IStore) => state.units.map(({ name }) => name);
