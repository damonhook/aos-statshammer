import BaseTargetModifier from './BaseTargetModifier';
import TargetReroll from './TargetReroll';
import TargetRerollFailed from './TargetRerollFailed';
import TargetRerollOnes from './TargetRerollOnes';
import TargetFeelNoPain from './TargetFeelNoPain';
import TargetMortalNegate from './TargetMortalNegate';
import TargetEthereal from './TargetEthereal';

/**
 * The list of possible target modifiers
 */
export const TARGET_MODIFIERS = {
  TARGET_REROLL: TargetReroll,
  TARGET_REROLL_FAILED: TargetRerollFailed,
  TARGET_REROLL_ONES: TargetRerollOnes,
  TARGET_FNP: TargetFeelNoPain,
  TARGET_MORTAL_NEGATE: TargetMortalNegate,
  TARGET_ETHEREAL: TargetEthereal,
};

/**
 * A manager used to hold and manage modifiers
 */
export class TargetModifierManager {
  constructor(modifiers = []) {
    this.modifiers = modifiers.map((m) => {
      if (m instanceof BaseTargetModifier) return m;
      if (typeof m === 'object' && 'id' in m && 'options' in m) {
        if (TARGET_MODIFIERS[m.id]) return TARGET_MODIFIERS[m.id].parse(m);
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
   */
  getModifier(modifier) {
    return this.modifiers.find((m) => m instanceof modifier);
  }

  /**
   * Fetch the most prominent reroll modifier from the list of managed modifiers based on its
   * characteristic property
   */
  getRerollModifier() {
    return (
      this.getModifier(TARGET_MODIFIERS.TARGET_REROLL)
      || this.getModifier(TARGET_MODIFIERS.TARGET_REROLL_FAILED)
      || this.getModifier(TARGET_MODIFIERS.TARGET_REROLL_ONES)
    );
  }

  /**
   * Fetch a list of stackable modifiers from the list of managed modifiers based
   * on their class definition and characteristic property
   * @param {BaseModifier} modifier The modifier class to fetch
   */
  getStackableModifier(modifier) {
    return this.modifiers.filter((m) => m instanceof modifier);
  }
}
