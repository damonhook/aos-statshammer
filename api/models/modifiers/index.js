import RerollFailed from './RerollFailed';
import Reroll from './Reroll';
import Exploding from './Exploding';
import MortalWounds from './MortalWounds';
import Bonus from './Bonus';
import RerollOnes from './RerollOnes';
import BaseModifier from './BaseModifier';
import ConditionalBonus from './ConditionalBonus';
import LeaderBonus from './LeaderBonus';

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

/**
 * A manager used to hold and manage modifiers
 */
export class ModifierManager {
  constructor(modifiers = []) {
    this.modifiers = modifiers.map((m) => {
      if (m instanceof BaseModifier) return m;
      if (typeof m === 'object' && 'id' in m && 'options' in m) {
        if (MODIFIERS[m.id]) return MODIFIERS[m.id].parse(m);
      }
      return null;
    });
    this.modifiers.filter((m) => m != null);
  }

  /**
   * Add a modifier to the list of managed modifiers
   * @param {BaseModifier} modifier The modifier to add to the list
   */
  addModifier(modifier) {
    this.modifiers.push(modifier);
  }

  /**
   * Fetch a modifier from the list of managed modifiers based on its class definition and
   * characteristic property
   * @param {BaseModifier} modifier The modifier class to fetch
   * @param {Characteristic} characteristic The characteristic the fetched modifier must belong to
   */
  getModifier(modifier, characteristic) {
    return this.modifiers.find(
      (m) => m instanceof modifier && m.characteristic === characteristic,
    );
  }

  /**
   * Fetch the most prominent reroll modifier from the list of managed modifiers based on its
   * characteristic property
   * @param {Characteristic} characteristic The characteristic to fetch the reroll modifiers for
   */
  getRerollModifier(characteristic) {
    return (
      this.getModifier(MODIFIERS.REROLL, characteristic)
      || this.getModifier(MODIFIERS.REROLL_FAILED, characteristic)
      || this.getModifier(MODIFIERS.REROLL_ONES, characteristic)
    );
  }

  /**
   * Fetch a list of stackable modifiers from the list of managed modifiers based
   * on their class definition and characteristic property
   * @param {BaseModifier} modifier The modifier class to fetch
   * @param {Characteristic} characteristic The characteristic the fetched modifiers must belong to
   */
  getStackableModifier(modifier, characteristic) {
    return this.modifiers.filter((m) => (
      m instanceof modifier && m.characteristic === characteristic
    ));
  }
}
