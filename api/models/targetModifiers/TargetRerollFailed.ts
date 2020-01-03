import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';

export default class TargetReroll extends BaseTargetModifier {
  static get name() {
    return 'Target Reroll Failed';
  }

  static get description() {
    return 'Reroll Failed Save Rolls';
  }

  resolve(profile, target) {
    return this.numRerolls(profile, target) * D6.getProbability(target.getSave(profile.getRend()));
  }

  numRerolls(profile, target) {
    if (target.getSave(profile.getRend()) === null) {
      return 0;
    }
    const save = Math.min(target.getSave(), target.getSave(profile.getRend()));
    return D6.getInverseProbability(save);
  }

  // eslint-disable-next-line no-unused-vars
  allowedReroll(profile, target, roll) {
    return roll < target.getSave();
  }
}
