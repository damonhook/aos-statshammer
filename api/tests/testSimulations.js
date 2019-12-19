/* eslint-disable no-undef */
import Unit from '../models/unit';
import WeaponProfile from '../models/weaponProfile';
import { MODIFIERS as m } from '../models/modifiers';
import { Characteristics as C } from '../constants';
import { testSimulation } from './utils';


describe('Units', () => {
  describe('Chainrasp Horde', () => {
    const unit = new Unit('Chainrasp Horde', [
      new WeaponProfile(10, 2, 4, 4, 0, 1, [
        new m.LEADER_BONUS({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
      ]),
    ]);
    testSimulation(unit, [5.25, 4.375, 3.5, 2.625, 1.75, 0.875]);
  });
});
