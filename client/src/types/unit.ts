import { IModifierInstance } from './modifiers';

export interface IWeaponProfileParameter {
  name?: string;
  uuid?: string;
  active: boolean;
  num_models: number;
  attacks: number | string;
  to_hit: number;
  to_wound: number;
  rend: number;
  damage: number | string;
  modifiers: IModifierInstance[];
}

export interface IWeaponProfile extends IWeaponProfileParameter {
  uuid: string;
}

export interface IUnitParameter {
  name: string;
  weapon_profiles?: IWeaponProfileParameter[];
}

export interface IUnit extends IUnitParameter {
  name: string;
  uuid: string;
  weapon_profiles: IWeaponProfile[];
}
