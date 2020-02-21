import { D6 } from '../dice';
import Target from '../target';
import WeaponProfile from '../weaponProfile';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetReroll extends BaseTargetModifier {
  static get displayName() {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allowedReroll(profile: WeaponProfile, target: Target, roll: number) {
    return true;
  }
}
