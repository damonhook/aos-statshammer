export interface IModifierDefinition {
  id: string;
}

export interface IModifiersStore {
  pending: boolean;
  modifiers?: IModifierDefinition[];
  error?: boolean | string;
}

export interface ITargetModifiersStore {
  pending: boolean;
  modifiers?: IModifierDefinition[];
  error?: boolean | string;
}

export interface IModifierInstance {
  id: string;
  options: object;
}

export interface IWeaponProfile {
  uuid: string;
  active: boolean;
  num_models: number;
  attacks: number | string;
  to_hit: number;
  to_wound: number;
  rend: number;
  damage: number | string;
  modifiers: IModifierInstance[];
}

export interface IUnit {
  name: string;
  uuid: string;
  weapon_profiles: IWeaponProfile[];
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

export interface INotification {
  message: string;
  key: string;
  variant?: string;
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
