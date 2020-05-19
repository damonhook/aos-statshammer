import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';

export default class Reroll extends BaseModifier {
  ['constructor']: typeof Reroll;

  static get displayName() {
    return 'Reroll';
  }

  static get description() {
    return 'Reroll rolls for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  resolve(owner: WeaponProfile) {
    return this.numRerolls(owner) * D6.getProbability(owner.getCharacteristic(this.characteristic));
  }

  numRerolls(owner: WeaponProfile) {
    return D6.getInverseProbability(owner.getCharacteristic(this.characteristic, false));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allowedReroll(owner: WeaponProfile, roll: number) {
    return true;
  }
}
