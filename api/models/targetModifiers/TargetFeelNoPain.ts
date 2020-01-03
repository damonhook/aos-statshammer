import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';
import { rollOption } from '../../utils/ModifierOptions';
import WeaponProfile from '../weaponProfile';

export default class TargetFeelNoPain extends BaseTargetModifier {
  on: number;

  constructor({ on = 6 }) {
    super();
    this.on = Number(on);
  }

  static get name() {
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

  resolve(profile: WeaponProfile, target: Target) {
    return D6.getProbability(this.on);
  }
}
