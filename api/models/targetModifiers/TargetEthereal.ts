import type Target from '../target';
import type WeaponProfile from '../weaponProfile';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetEthereal extends BaseTargetModifier {
  static get displayName() {
    return 'Target Ethereal';
  }

  static get description() {
    return 'Ignore modifiers to save (positive or negative) when making save rolls';
  }

  resolve(profile: WeaponProfile, target: Target) {
    return target.getSave(undefined);
  }
}
