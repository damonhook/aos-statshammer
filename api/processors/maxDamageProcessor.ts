import { Characteristic as C } from '../constants';
import { MODIFIERS as m } from '../models/modifiers';
import type WeaponProfile from '../models/weaponProfile';

export default class MaxDamageProcessor {
  profile: WeaponProfile;

  constructor(profile: WeaponProfile) {
    this.profile = profile;
  }

  getMaxDamage() {
    let { numModels } = this.profile;

    const leaderModifiers = this.profile.getLeaderModifiers();
    let leaderMax = 0;
    if (leaderModifiers && leaderModifiers.length) {
      const { numLeaders } = leaderModifiers[0];
      numModels = Math.max(numModels - numLeaders, 0);
      const leaderProfile = this.profile.getSplitProfile(
        leaderModifiers,
        leaderModifiers.map((mod) => mod.getAsBonusModifier()),
      );
      leaderProfile.numModels = numLeaders;
      leaderMax = numLeaders * new MaxDamageProcessor(leaderProfile).getMaxDamageForModel();
    }

    const otherMax = numModels * this.getMaxDamageForModel();
    return otherMax + leaderMax;
  }

  private getMaxDamageForModel(): number {
    const { attacks, damage } = this.profile;
    const attacksMax = this.resolveExplodingModifiers(attacks.max + this.resolveBonusModifiers(C.ATTACKS));
    const damageMax = this.resolveMortalWounds(damage.max + this.resolveBonusModifiers(C.DAMAGE));
    return attacksMax * damageMax;
  }

  private resolveBonusModifiers(characteristic: C): number {
    let bonus = 0;
    const modList = this.profile.modifiers.getStackableModifier(m.BONUS, characteristic);
    if (modList && modList.length) {
      bonus += modList.reduce((acc, mod) => acc + mod.bonus.max, 0);
    }

    m.CONDITIONAL_BONUS.availableCharacteristics.forEach((c) => {
      const mod = this.profile.modifiers.getModifier(m.CONDITIONAL_BONUS, c);
      if (mod && mod.bonusToCharacteristic === characteristic) {
        bonus += mod.bonus.max;
      }
    });

    return bonus;
  }

  private resolveExplodingModifiers(numAttacks: number): number {
    return m.EXPLODING.availableCharacteristics.reduce((acc, c) => {
      const mod = this.profile.modifiers.getModifier(m.EXPLODING, c);
      if (mod && mod.extraHits.max > 0) return acc + numAttacks * mod.extraHits.max;
      return acc;
    }, numAttacks);
  }

  private resolveMortalWounds(currentMax: number): number {
    let cumulativeMax = currentMax;
    let discreteMax = 0;
    m.MORTAL_WOUNDS.availableCharacteristics.forEach((c) => {
      const mod = this.profile.modifiers.getModifier(m.MORTAL_WOUNDS, c);
      if (mod) {
        const modMax = mod.mortalWounds.max;
        if (mod.inAddition) {
          cumulativeMax += modMax;
        } else {
          discreteMax = modMax > discreteMax ? modMax : discreteMax;
        }
      }
    });
    return Math.max(cumulativeMax, discreteMax);
  }
}
