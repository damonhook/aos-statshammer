import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';

export default class RerollFailed extends BaseModifier {
  ['constructor']: typeof RerollFailed;

  static get displayName() {
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
