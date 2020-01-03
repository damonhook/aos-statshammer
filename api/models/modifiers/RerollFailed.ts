import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import BaseModifier from './BaseModifier';
import WeaponProfile from '../weaponProfile';

export default class RerollFailed extends BaseModifier {
  ['constructor']: typeof RerollFailed;

  static get name() {
    return 'Reroll Failed';
  }

  static get description() {
    return 'Reroll Failed rolls for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner: WeaponProfile) {
    return this.numRerolls(owner) * D6.getProbability(owner.getCharacteristic(this.characteristic));
  }

  numRerolls(owner: WeaponProfile) {
    const activeCharacteristic = Math.min(
      owner.getCharacteristic(this.characteristic, true),
      owner.getCharacteristic(this.characteristic, false),
    );
    return D6.getInverseProbability(activeCharacteristic);
  }

  allowedReroll(owner: WeaponProfile, roll: number) {
    return roll < owner.getCharacteristic(this.characteristic, true);
  }
}
