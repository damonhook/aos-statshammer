import { ModifierManager } from '../models/modifiers';
import DiceValue from '../models/diceValue';
import { TargetModifierManager } from 'api/models/targetModifiers';

export interface IWeaponProfile {
  numModels: number;
  attacks: DiceValue;
  toHit: number;
  toWound: number;
  rend: number;
  damage: DiceValue;
  modifiers: ModifierManager;
}

export interface ITarget {
  save: number;
  modifiers: TargetModifierManager;
}
