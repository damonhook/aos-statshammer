import { Characteristics as C } from '../../constants';
import { D6 } from '../dice';
import BaseModifier from './BaseModifier';

export default class Reroll extends BaseModifier {
  static get name() {
    return 'Reroll';
  }

  static get description() {
    return 'Reroll rolls for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner) {
    return (this.numRerolls(owner) * D6.getProbability(
      owner.getCharacteristic(this.characteristic),
    ));
  }

  numRerolls(owner) {
    return D6.getInverseProbability(
      owner.getCharacteristic(this.characteristic, false),
    );
  }
}
