import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';
import { rollOption } from '../../utils/ModifierOptions';
import WeaponProfile from '../weaponProfile';
import Target from '../target';

export default class TargetFeelNoPain extends BaseTargetModifier {
  on: number;

  constructor({ on = 6 }) {
    super({});
    this.on = Number(on);
  }

  static get displayName() {
    return 'Target Feel No Pain';
  }

  static get description() {
    return 'Ignore wounds and mortal wounds on a roll of {on}+';
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
