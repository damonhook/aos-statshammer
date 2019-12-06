import { Characteristics as C } from '../../constants';
import { D6 } from '../dice';
import BaseModifier from './BaseModifier';

export default class RerollFailed extends BaseModifier {
  static get name() {
    return 'Reroll Failed';
  }

  static get description() {
    return 'Reroll Failed rolls for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner) {
    const numRerolls = D6.getInverseProbability(
      owner.getCharacteristic(this.characteristic, true),
    );
    return numRerolls * D6.getProbability(owner.getCharacteristic(this.characteristic));
  }
}
