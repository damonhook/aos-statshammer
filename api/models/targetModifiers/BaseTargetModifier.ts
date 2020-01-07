import WeaponProfile from '../weaponProfile';
import Target from '../target';

export default class BaseTargetModifier {
  static get displayName(): string {
    return null;
  }

  static get description(): string {
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
      name: this.displayName,
      description: this.description,
      options: this.options,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(profile: WeaponProfile, target: Target): number {
    throw new Error('Resolve method not implemented');
  }
}
