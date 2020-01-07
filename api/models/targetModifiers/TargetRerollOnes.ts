import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';
import WeaponProfile from '../weaponProfile';
import Target from '../target';

export default class TargetRerollOnes extends BaseTargetModifier {
  static get displayName() {
    return 'Target Reroll Ones';
  }

  static get description() {
    return 'Reroll Save Rolls of One';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return this.numRerolls(profile, target) * D6.getProbability(target.getSave(profile.getRend()));
  }

  numRerolls(profile: WeaponProfile, target: Target) {
    if (target.getSave(profile.getRend()) === null) {
      return 0;
    }
    return 1 / D6.sides;
  }

  allowedReroll(profile: WeaponProfile, target: Target, roll: number) {
    return roll === 1 && target.getSave(profile.getRend()) !== null;
  }
}
