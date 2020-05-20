import type Target from '../target';
import type WeaponProfile from '../weaponProfile';

export default class BaseTargetModifier {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(data: any) {}

  static get displayName(): string {
    return '';
  }

  static get description(): string {
    return '';
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
  resolve(profile: WeaponProfile, target: Target): number | null {
    throw new Error('Resolve method not implemented');
  }
}
