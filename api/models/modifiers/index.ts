import type { Characteristic } from 'api/constants';

import BaseModifier from './BaseModifier';
import Bonus from './Bonus';
import ConditionalBonus from './ConditionalBonus';
import Exploding from './Exploding';
import LeaderBonus from './LeaderBonus';
import MortalWounds from './MortalWounds';
import Reroll from './Reroll';
import RerollFailed from './RerollFailed';
import RerollOnes from './RerollOnes';

/**
 * The list of possible modifiers
 */
export const MODIFIERS = {
  REROLL_ONES: RerollOnes,
  REROLL_FAILED: RerollFailed,
  REROLL: Reroll,
  EXPLODING: Exploding,
  MORTAL_WOUNDS: MortalWounds,
  BONUS: Bonus,
  CONDITIONAL_BONUS: ConditionalBonus,
  LEADER_BONUS: LeaderBonus,
};

// type TBaseModifier = { new (data: any) };

/**
 * A manager used to hold and manage modifiers
 */
export default class ModifierManager {
  modifiers: BaseModifier[];

  constructor(modifiers: (BaseModifier | { id: string; options: any })[] = []) {
    const mods = modifiers.map((m) => {
      if (m instanceof BaseModifier) return m;
      if (typeof m === 'object' && 'id' in m && 'options' in m) {
        if (MODIFIERS[m.id]) return this.parseModifier(MODIFIERS[m.id], m);
      }
      return null;
    });

    this.modifiers = mods.filter((m) => m != null) as BaseModifier[];
  }

  /**
   * Add a modifier to the list of managed modifiers
   * @param modifier The modifier to add to the list
   */
  addModifier(modifier: BaseModifier) {
    this.modifiers.push(modifier);
  }

  /**
   * Fetch a modifier from the list of managed modifiers based on its class definition and
   * characteristic property
   * @param modifier The modifier class to fetch
   * @param characteristic The characteristic the fetched modifier must belong to
   */
  getModifier<T extends typeof BaseModifier>(
    modifier: T,
    characteristic: Characteristic,
  ): InstanceType<T> | null {
    return this.modifiers.find(
      (m) => m instanceof modifier && m.characteristic === characteristic,
    ) as InstanceType<T> | null;
  }

  /**
   * Fetch the most prominent reroll modifier from the list of managed modifiers based on its
   * characteristic property
   * @param characteristic The characteristic to fetch the reroll modifiers for
   */
  getRerollModifier(characteristic: Characteristic): RerollOnes | RerollFailed | Reroll | null {
    return (
      this.getModifier(MODIFIERS.REROLL, characteristic) ||
      this.getModifier(MODIFIERS.REROLL_FAILED, characteristic) ||
      this.getModifier(MODIFIERS.REROLL_ONES, characteristic)
    );
  }

  /**
   * Fetch a list of stackable modifiers from the list of managed modifiers based
   * on their class definition and characteristic property
   * @param modifier The modifier class to fetch
   * @param characteristic The characteristic the fetched modifiers must belong to
   */
  getStackableModifier<T extends typeof BaseModifier>(
    modifier: T,
    characteristic: Characteristic,
  ): InstanceType<T>[] {
    return this.modifiers.filter(
      (m) => m instanceof modifier && m.characteristic === characteristic,
    ) as InstanceType<T>[];
  }

  parseModifier<T extends BaseModifier>(ModifierType: new (data: any) => T, data: any): T {
    const options = data?.options ?? {};
    const cleanData = Object.keys(options ?? {}).reduce((acc, key) => {
      if (options[key] != null) acc[key] = options[key];
      return acc;
    }, {});
    return new ModifierType(cleanData);
  }
}
