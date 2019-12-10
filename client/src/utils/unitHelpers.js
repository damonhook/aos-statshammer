import store from 'store';
import { MAX_UNITS } from 'appConstants';

export const getUnitByUuid = (uuid) => store.getState().units.find((unit) => unit.uuid === uuid);

export const getUnitIndexByUuid = (uuid) => (
  store.getState().units.findIndex((unit) => unit.uuid === uuid)
);

export const getUnitByPosition = (index) => store.getState().units[index];

export const addUnitEnabled = () => store.getState().units.length < MAX_UNITS;
