import BaseTargetModifier from './BaseTargetModifier';
import Target from '../target';
import WeaponProfile from '../weaponProfile';

export default class TargetEthereal extends BaseTargetModifier {
  static get name() {
    return 'Target Ethereal';
  }

  static get description() {
    return 'Ignore modifiers to save (positive or negative) when making save rolls';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return target.getSave(null);
  }
}
