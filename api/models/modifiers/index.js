import RerollFailed from './RerollFailed';
import Reroll from './Reroll';
import Exploding from './Exploding';
import MortalWounds from './MortalWounds';
import Bonus from './Bonus';
import LeaderExtraAttacks from './LeaderExtraAttacks';
import RerollOnes from './RerollOnes';
import BaseModifier from './BaseModifier';
import ConditionalBonus from './ConditionalBonus';

export const MODIFIERS = {
  REROLL_ONES: RerollOnes,
  REROLL_FAILED: RerollFailed,
  REROLL: Reroll,
  EXPLODING: Exploding,
  MORTAL_WOUNDS: MortalWounds,
  BONUS: Bonus,
  LEADER_EXTRA_ATTACKS: LeaderExtraAttacks,
  CONDITIONAL_BONUS: ConditionalBonus,
};

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

  addModifier(modifier) {
    this.modifiers.push(modifier);
  }

  getModifier(modifier, characteristic) {
    return this.modifiers.find(
      (m) => m instanceof modifier && m.characteristic === characteristic,
    );
  }

  getRerollModifier(characteristic) {
    return (
      this.getModifier(MODIFIERS.REROLL, characteristic)
      || this.getModifier(MODIFIERS.REROLL_FAILED, characteristic)
      || this.getModifier(MODIFIERS.REROLL_ONES, characteristic)
    );
  }

  getStackableModifier(modifier, characteristic) {
    return this.modifiers.filter((m) => (
      m instanceof modifier && m.characteristic === characteristic
    ));
  }
}
