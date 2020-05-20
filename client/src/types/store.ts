import type { IModifierDefinition, IModifierInstance } from './modifiers';
import type { INotification } from './notification';
import type { ISimulationResult } from './simulations';
import type { TResults } from './stats';
import type { IUnit } from './unit';

export type TError = boolean | string | null;

export interface IModifiersStore {
  pending: boolean;
  items: IModifierDefinition[];
  error: TError;
}

export interface ITargetModifiersStore {
  pending: boolean;
  items: IModifierDefinition[];
  error: TError;
}

export type IUnitStore = IUnit[];

export interface ITargetStore {
  modifiers: IModifierInstance[];
}

export interface IStatsStore {
  pending: boolean;
  payload: TResults;
  error: TError;
}

export interface ISimulationsStore {
  pending: boolean;
  results: ISimulationResult[];
  error: TError;
}

export type INotificationsStore = INotification[];

export interface IConfigStore {
  /** Whether the app is in dark mode or not */
  darkMode: boolean;
  /** Whether to display the desktop graphs as tabbed, or a list */
  desktopGraphList: boolean;
  /** The number of simulations to run */
  numSimulations: number;
  /** Whether to use the rail version of the left navigation for lg breakpoints */
  useRailLg: boolean;
}

export interface IStore {
  modifiers: IModifiersStore;
  targetModifiers: ITargetModifiersStore;
  units: IUnitStore;
  target: ITargetStore;
  stats: IStatsStore;
  simulations: ISimulationsStore;
  notifications: INotificationsStore;
  config: IConfigStore;
}
