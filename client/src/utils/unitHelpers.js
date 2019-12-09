import store from 'store';

export const getUnitByUuid = (uuid) => store.getState().units.find((unit) => unit.uuid === uuid);

export const getUnitIndexByUuid = (uuid) => (
  store.getState().units.findIndex((unit) => unit.uuid === uuid)
);

export const getUnitByPosition = (index) => store.getState().units[index];
