import { createSelector } from 'reselect';
import { IStore } from 'types/store';

export const configSelector = (state: IStore) => state.config;

export const desktopGraphListSelector = createSelector(
  configSelector,
  ({ desktopGraphList }) => desktopGraphList,
);

export const numSimulationsSelector = createSelector(configSelector, ({ numSimulations }) => numSimulations);
