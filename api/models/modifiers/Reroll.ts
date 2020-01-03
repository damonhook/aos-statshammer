import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import BaseModifier from './BaseModifier';
import WeaponProfile from '../weaponProfile';

export default class Reroll extends BaseModifier {
  ['constructor']: typeof Reroll;

  static get name() {
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

  // eslint-disable-next-line no-unused-vars
  allowedReroll(owner: WeaponProfile, roll: number) {
    return true;
  }
}
