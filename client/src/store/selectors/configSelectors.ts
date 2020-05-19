import { createSelector } from 'reselect';
import type { IStore } from 'types/store';

export const configSelector = (state: IStore) => state.config;

export const desktopGraphListSelector = createSelector(
  configSelector,
  ({ desktopGraphList }) => desktopGraphList,
);

export const numSimulationsSelector = createSelector(configSelector, ({ numSimulations }) => numSimulations);

export const useRailLgSelector = createSelector(configSelector, ({ useRailLg }) => useRailLg);
