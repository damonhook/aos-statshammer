import { IModifierDefinition, IModifierInstance } from './modifiers';
import { IUnit } from './unit';
import { INotification } from './notification';
import { TResults } from './stats';
import { IProbability, TResult, ISimulation } from './simulations';

export type TError = boolean | string | null;

export interface IModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
  error: TError;
}

export interface ITargetModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
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
  results: TResult[];
  probabilities: IProbability[];
  error: TError;
}

export type INotificationsStore = INotification[];

export interface IConfigStore {
  /** Whether the app is in dark mode or not */
  darkMode: boolean;
  /** Whether to display the desktop graphs as tabbed, or a list */
  desktopGraphList: boolean;
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
