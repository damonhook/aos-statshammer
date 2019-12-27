import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetReroll extends BaseTargetModifier {
  static get name() {
    return 'Target Reroll';
  }

  static get description() {
    return 'Reroll Save Rolls';
  }

  resolve(profile, target) {
    return (this.numRerolls(profile, target) * D6.getProbability(
      target.getSave(profile.getRend()),
    ));
  }

  numRerolls(profile, target) {
    if (target.getSave(profile.getRend()) === null) {
      return 0;
    }
    return D6.getInverseProbability(
      target.getCharacteristic(this.characteristic, false),
    );
  }

  // eslint-disable-next-line no-unused-vars
  allowedReroll(profile, target, roll) {
    return true;
  }
}
