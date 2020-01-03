import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';
import WeaponProfile from '../weaponProfile';
import Target from '../target';

export default class TargetReroll extends BaseTargetModifier {
  static get name() {
    return 'Target Reroll';
  }

  static get description() {
    return 'Reroll Save Rolls';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return this.numRerolls(profile, target) * D6.getProbability(target.getSave(profile.getRend()));
  }

  numRerolls(profile: WeaponProfile, target: Target) {
    const save = target.getSave(profile.getRend());
    if (save === null) return 0;
    return D6.getInverseProbability(save);
  }

  allowedReroll(profile: WeaponProfile, target: Target, roll: number) {
    return true;
  }
}
