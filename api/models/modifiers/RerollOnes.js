import { Characteristics as C } from '../../constants';
import { D6 } from '../dice';
import BaseModifier from './BaseModifier';

export default class RerollOnes extends BaseModifier {
  static get name() {
    return 'Reroll Ones';
  }

  static get description() {
    return 'Reroll Ones for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner) {
    return (1 / D6.sides) * (
      D6.getProbability(owner.getCharacteristic(this.characteristic))
    );
  }
}
