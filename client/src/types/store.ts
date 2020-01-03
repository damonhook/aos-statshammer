import { IModifierDefinition, IModifierInstance } from './modifiers';
import { IUnit } from './unit';
import { INotification } from './notification';

export interface IModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
  error?: boolean | string;
}

export interface ITargetModifiersStore {
  pending: boolean;
  modifiers: IModifierDefinition[];
  error?: boolean | string;
}

export type IUnitStore = IUnit[];

export interface ITargetStore {
  modifiers: IModifierInstance[];
}

export interface IStatsStore {
  pending: boolean;
  payload?: any[];
  error?: boolean | string;
}

export interface ISimulationsStore {
  pending: boolean;
  results?: any[];
  probabilities?: any[];
  error?: boolean | string;
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
