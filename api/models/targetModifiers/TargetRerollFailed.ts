import { D6 } from '../dice';
import type Target from '../target';
import type WeaponProfile from '../weaponProfile';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetReroll extends BaseTargetModifier {
  static get displayName() {
    return 'Target Reroll Failed';
  }

  static get description() {
    return 'Reroll Failed Save Rolls';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return this.numRerolls(profile, target) * D6.getProbability(target.getSave(profile.getRend()) ?? 0);
  }

  numRerolls(profile: WeaponProfile, target: Target) {
    if (target.getSave(profile.getRend()) === null || target.getSave() === null) {
      return 0;
    }
    const save = Math.min(Number(target.getSave()), Number(target.getSave(profile.getRend())));
    return D6.getInverseProbability(save);
  }

  allowedReroll(profile: WeaponProfile, target: Target, roll: number) {
    return target.getSave() !== null && roll < Number(target.getSave());
  }
}
