import RerollFailed from './RerollFailed';
import Reroll from './Reroll';
import Exploding from './Exploding';
import MortalWounds from './MortalWounds';
import Bonus from './Bonus';
import RerollOnes from './RerollOnes';
import BaseModifier from './BaseModifier';
import ConditionalBonus from './ConditionalBonus';
import LeaderBonus from './LeaderBonus';
import { Characteristic } from 'api/constants';

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

type TRerollModifier = RerollOnes | RerollFailed | Reroll;

/**
 * A manager used to hold and manage modifiers
 */
export default class ModifierManager {
  modifiers: BaseModifier[];

  constructor(modifiers = []) {
    this.modifiers = modifiers.map(m => {
      if (m instanceof BaseModifier) return m;
      if (typeof m === 'object' && 'id' in m && 'options' in m) {
        if (MODIFIERS[m.id]) return this.parseModifier(MODIFIERS[m.id], m);
      }
      return null;
    });
    this.modifiers.filter(m => m != null);
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
  getModifier(modifier: typeof BaseModifier, characteristic: Characteristic): BaseModifier | null {
    return this.modifiers.find(
      (m: BaseModifier) => m instanceof modifier && m.characteristic === characteristic,
    );
  }

  /**
   * Fetch the most prominent reroll modifier from the list of managed modifiers based on its
   * characteristic property
   * @param characteristic The characteristic to fetch the reroll modifiers for
   */
  getRerollModifier(characteristic: Characteristic): TRerollModifier | null {
    //@ts-ignore
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
  getStackableModifier(modifier: typeof BaseModifier, characteristic: Characteristic) {
    return this.modifiers.filter(
      (m: BaseModifier) => m instanceof modifier && m.characteristic === characteristic,
    );
  }

  parseModifier(modifierType: typeof BaseModifier, data: any) {
    const options = (data || {}).options || {};
    const cleanData = Object.keys(options || {}).reduce((acc, key) => {
      if (options[key] != null) acc[key] = options[key];
      return acc;
    }, {});
    //@ts-ignore
    return new modifierType(cleanData);
  }
}
