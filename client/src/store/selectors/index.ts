import { IStore } from 'types/store';
import appConfig from 'appConfig';

export const getNumUnits = (state: IStore) => state.units.length ?? 0;

export const getAddUnitEnabled = (state: IStore) => getNumUnits(state) < appConfig.limits.units;
