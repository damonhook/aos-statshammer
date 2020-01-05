import { IModifierDefinition, IModifierInstance } from './modifiers';
import { IUnit } from './unit';
import { INotification } from './notification';
import { TResults } from './stats';
import { IProbability, TResult, ISimulation } from './simulations';

export interface IModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
  error?: boolean | string | null;
}

export interface ITargetModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
  error?: boolean | string | null;
}

export type IUnitStore = IUnit[];

export interface ITargetStore {
  modifiers: IModifierInstance[];
}

export interface IStatsStore {
  pending: boolean;
  payload?: TResults;
  error?: boolean | string | null;
}

export interface ISimulationsStore {
  pending: boolean;
  results?: TResult[];
  probabilities?: IProbability[];
  error?: boolean | string | null;
}

export type INotificationsStore = INotification[];

export interface IConfigStore {
  darkMode: boolean;
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
