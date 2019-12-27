import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetFeelNoPain extends BaseTargetModifier {
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

  // eslint-disable-next-line no-unused-vars
  resolve(profile, target) {
    return D6.getProbability(this.on);
  }
}
