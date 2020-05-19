import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';

export default class RerollOnes extends BaseModifier {
  ['constructor']: typeof RerollOnes;

  static get displayName() {
    return 'Reroll Ones';
  }

  static get description() {
    return 'Reroll Ones for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner: WeaponProfile) {
    return this.numRerolls(owner) * D6.getProbability(owner.getCharacteristic(this.characteristic));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  numRerolls(owner: WeaponProfile) {
    return 1 / D6.sides;
  }

  allowedReroll(owner: WeaponProfile, roll: number) {
    return roll === 1;
  }
}
