import BaseTargetModifier from './BaseTargetModifier';

export default class TargetEthereal extends BaseTargetModifier {
  static get name() {
    return 'Target Ethereal';
  }

  static get description() {
    return 'Ignore modifiers to save (positive or negative) when making save rolls';
  }

  resolve(profile, target) {
    return target.getSave(null);
  }
}
