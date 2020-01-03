import WeaponProfile from '../weaponProfile';
import Target from '../target';

export default class BaseTargetModifier {
  static get name() {
    return null;
  }

  static get description() {
    return null;
  }

  static get availableCharacteristics() {
    return [];
  }

  static get options() {
    return {};
  }

  static get metadata() {
    return {
      name: this.name,
      description: this.description,
      options: this.options,
    };
  }

  resolve(profile: WeaponProfile, target: Target) {
    throw new Error('Resolve method not implemented');
  }
}
