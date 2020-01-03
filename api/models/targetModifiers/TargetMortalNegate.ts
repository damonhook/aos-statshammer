import { D6 } from '../dice';
import BaseTargetModifier from './BaseTargetModifier';
import { rollOption } from '../../utils/ModifierOptions';

export default class TargetMortalNegate extends BaseTargetModifier {
  constructor({ on = 6 }) {
    super();
    this.on = Number(on);
  }

  static get name() {
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

  // eslint-disable-next-line no-unused-vars
  resolve(profile, target) {
    return D6.getProbability(this.on);
  }
}
