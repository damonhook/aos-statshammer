import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetRerollOnes extends BaseTargetModifier {
  static get name() {
    return 'Target Reroll Ones';
  }

  static get description() {
    return 'Reroll Save Rolls of One';
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
    return 1 / D6.sides;
  }

  // eslint-disable-next-line no-unused-vars
  allowedReroll(profile, target, roll) {
    return roll === 1 && target.getSave(profile.getRend()) !== null;
  }
}
