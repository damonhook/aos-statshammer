import { Characteristic as C } from '../../constants';
import { D6 } from '../../models/dice';
import DiceValue from '../../models/diceValue';
import { MODIFIERS as m } from '../../models/modifiers';
import Unit from '../../models/unit';
import WeaponProfile from '../../models/weaponProfile';

export const chainraspHorde = new Unit('Chainrasp Horde', [
  new WeaponProfile(10, 2, 4, 4, 0, 1, [
    new m.LEADER_BONUS({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
  ]),
]);

export const mortekGuard = new Unit('Mortek Guard', [
  new WeaponProfile(9, 2, 3, 4, 1, 1, [
    new m.LEADER_BONUS({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
    new m.EXPLODING({
      characteristic: C.TO_HIT,
      on: 6,
      extraHits: 1,
      unmodified: true,
    }),
  ]),
  new WeaponProfile(1, 2, 3, 3, 1, 1, []),
]);

export const hearthGuardBerzerkersBroadaxes = new Unit('Hearthguard Berzerkers', [
  new WeaponProfile(20, 2, 3, 3, 1, 2, [
    new m.LEADER_BONUS({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
  ]),
]);

export const hearthGuardBerzerkersPoleaxes = new Unit('Hearthguard Berzerkers', [
  new WeaponProfile(20, 2, 3, 3, 0, 1, [
    new m.LEADER_BONUS({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
    new m.MORTAL_WOUNDS({
      characteristic: C.TO_HIT,
      on: 6,
      mortalWounds: 2,
      unmodified: true,
      inAddition: true,
    }),
  ]),
]);

export const necropolisStalkersBase = new Unit('Necropolis Stalkers', [
  new WeaponProfile(1, 3, 3, 4, 2, 2, []),
  new WeaponProfile(2, 5, 3, 3, 1, 1, []),
]);

export const necropolisStalkersPrec = new Unit('Necropolis Stalkers', [
  new WeaponProfile(1, 3, 3, 4, 2, 2, [
    new m.BONUS({ characteristic: C.REND, bonus: 1 }),
    new m.BONUS({ characteristic: C.DAMAGE, bonus: 1 }),
  ]),
  new WeaponProfile(2, 5, 3, 3, 1, 1, [
    new m.BONUS({ characteristic: C.REND, bonus: 1 }),
    new m.BONUS({ characteristic: C.DAMAGE, bonus: 1 }),
  ]),
]);

export const necropolisStalkersSwordsBase = new Unit('Necropolis Stalkers', [
  new WeaponProfile(3, 5, 3, 3, 1, 1, []),
]);

export const necropolisStalkersSwordsPrec = new Unit('Necropolis Stalkers', [
  new WeaponProfile(3, 5, 3, 3, 1, 1, [
    new m.BONUS({ characteristic: C.REND, bonus: 1 }),
    new m.BONUS({ characteristic: C.DAMAGE, bonus: 1 }),
  ]),
]);

export const gotrek = new Unit('Gotrek Gurnisson', [
  new WeaponProfile(1, 6, 3, 3, 2, 3, [
    new m.REROLL({ characteristic: C.TO_HIT }),
    new m.REROLL({ characteristic: C.TO_WOUND }),
    new m.MORTAL_WOUNDS({
      characteristic: C.TO_HIT,
      on: 6,
      mortalWounds: D6,
      unmodified: true,
      inAddition: true,
    }),
  ]),
]);

export const spiritHosts = new Unit('Spirit Hosts', [
  new WeaponProfile(3, 6, 5, 4, 0, 1, [
    new m.MORTAL_WOUNDS({
      characteristic: C.TO_HIT,
      on: 6,
      mortalWounds: 1,
      inAddition: false,
      unmodified: true,
    }),
  ]),
]);

export const kurnothHuntersSwords = new Unit('Kurnoth Hunters', [
  new WeaponProfile(3, 4, 3, 3, 1, 2, [
    new m.MORTAL_WOUNDS({
      characteristic: C.TO_WOUND,
      on: 6,
      mortalWounds: 1,
      inAddition: true,
      unmodified: true,
    }),
    new m.LEADER_BONUS({ characteristic: C.TO_HIT, numLeaders: 1, bonus: 1 }),
  ]),
]);

export const plagueMonksOld = new Unit('Plague Monks (pre Dec 2019 FAQ)', [
  new WeaponProfile(20, 2, 4, 4, 0, 1, [
    new m.REROLL({ characteristic: C.TO_HIT }),
    new m.CONDITIONAL_BONUS({
      characteristic: C.TO_HIT,
      bonus: 1,
      unmodified: true,
      bonusToCharacteristic: C.REND,
    }),
    new m.CONDITIONAL_BONUS({
      characteristic: C.TO_WOUND,
      bonus: 1,
      unmodified: true,
      bonusToCharacteristic: C.DAMAGE,
    }),
  ]),
]);

export const rattlingGunners = new Unit('Rattling Gunners', [
  new WeaponProfile(1, DiceValue.parse('2D6'), 4, 4, 1, 1, []),
]);

// #region edge cases
export const explodingAndConditionalSame = new Unit('Exploding And Conditional (Same Characteristic)', [
  new WeaponProfile(1, 3, 3, 4, 1, 2, [
    new m.EXPLODING({
      characteristic: C.TO_HIT,
      on: 6,
      extraHits: 2,
      unmodified: true,
    }),
    new m.CONDITIONAL_BONUS({
      characteristic: C.TO_HIT,
      bonus: 1,
      unmodified: true,
      bonusToCharacteristic: C.DAMAGE,
    }),
  ]),
]);

export const explodingAndConditionalDifferent = new Unit(
  'Exploding And Conditional (Different Characteristic)',
  [
    new WeaponProfile(1, 3, 3, 4, 1, 2, [
      new m.EXPLODING({
        characteristic: C.TO_HIT,
        on: 6,
        extraHits: 2,
        unmodified: true,
      }),
      new m.CONDITIONAL_BONUS({
        characteristic: C.TO_WOUND,
        bonus: 1,
        unmodified: true,
        bonusToCharacteristic: C.DAMAGE,
      }),
    ]),
  ],
);

export const noDamageWeapons = new Unit('NoDamageWeapons', [new WeaponProfile(10, 2, 4, 4, 0, 0, [])]);
// #endregion
