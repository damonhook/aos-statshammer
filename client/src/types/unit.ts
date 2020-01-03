import { IModifierInstance } from './modifiers';
export interface IWeaponProfile {
  name?: string;
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
