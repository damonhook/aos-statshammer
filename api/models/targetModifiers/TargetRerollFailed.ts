import { D6 } from '../dice';
import Target from '../target';
import WeaponProfile from '../weaponProfile';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetReroll extends BaseTargetModifier {
  static get displayName() {
    return 'Target Reroll Failed';
  }

  static get description() {
    return 'Reroll Failed Save Rolls';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return this.numRerolls(profile, target) * D6.getProbability(target.getSave(profile.getRend()));
  }

  numRerolls(profile: WeaponProfile, target: Target) {
    if (target.getSave(profile.getRend()) === null) {
      return 0;
    }
    const save = Math.min(target.getSave(), target.getSave(profile.getRend()));
    return D6.getInverseProbability(save);
  }

  allowedReroll(profile: WeaponProfile, target: Target, roll: number) {
    return roll < target.getSave();
  }
}
