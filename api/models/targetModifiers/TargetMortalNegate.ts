import { rollOption } from '../../utils/modifierUtils';
import { D6 } from '../dice';
import type Target from '../target';
import type WeaponProfile from '../weaponProfile';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetMortalNegate extends BaseTargetModifier {
  on: number;

  constructor({ on = 6 }) {
    super({});
    this.on = Number(on);
  }

  static get displayName() {
    return 'Target Mortal Wound Negate';
  }

  static get description() {
    return 'Negate mortal wounds on a roll of {on}+';
  }

  static get options() {
    return {
      on: rollOption({ defaultVal: 6 }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(profile: WeaponProfile, target: Target) {
    return D6.getProbability(this.on);
  }
}
