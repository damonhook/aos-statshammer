import store from 'store';
import { MAX_UNITS } from 'appConstants';

// @ts-ignore
export const getUnits = () => store.getState().units;

export const getNumUnits = () => getUnits().length;

export const getUnitByUuid = uuid => getUnits().find(unit => unit.uuid === uuid);

export const getUnitIndexByUuid = uuid => getUnits().findIndex(unit => unit.uuid === uuid);

export const getUnitByPosition = index => getUnits()[index];

export const addUnitEnabled = () => getUnits().length < MAX_UNITS;
