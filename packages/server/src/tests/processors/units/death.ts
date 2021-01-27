import { Characteristic as C } from 'common'
import Bonus from 'models/modifiers/Bonus'
import Exploding from 'models/modifiers/Exploding'
import LeaderBonus from 'models/modifiers/LeaderBonus'
import MortalWounds from 'models/modifiers/MortalWounds'
import RerollFailed from 'models/modifiers/RerollFailed'
import RerollOnes from 'models/modifiers/RerollOnes'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'

export const ChainraspHorde = new Unit({
  name: 'Chainrasp Horde',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 10,
      attacks: 2,
      toHit: 4,
      toWound: 4,
      rend: 0,
      damage: 1,
      modifiers: [new LeaderBonus({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 })],
    }),
  ],
})

export const DreadbladeHarrow = new Unit({
  name: 'Dreadblade Harrow',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 1,
      attacks: 3,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 1,
      modifiers: [new RerollOnes({ characteristic: C.TO_WOUND })],
    }),
    new WeaponProfile({ numModels: 1, attacks: 2, toHit: 4, toWound: 5, rend: 0, damage: 1 }),
  ],
})

export const CairnWraith = new Unit({
  name: 'Cairn Wraith',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 1,
      attacks: 3,
      toHit: 4,
      toWound: 3,
      rend: 1,
      damage: 2,
      modifiers: [
        new RerollFailed({ characteristic: C.TO_HIT }),
        new MortalWounds({ characteristic: C.TO_HIT, on: 6, mortalWounds: 2, inAddition: false }),
      ],
    }),
  ],
})

export const SpiritHosts = new Unit({
  name: 'Spirit Hosts',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 3,
      attacks: 6,
      toHit: 5,
      toWound: 4,
      rend: 0,
      damage: 1,
      modifiers: [
        new MortalWounds({
          characteristic: C.TO_HIT,
          on: 6,
          mortalWounds: 1,
          inAddition: false,
          unmodified: true,
        }),
      ],
    }),
  ],
})

export const MortekGuard = new Unit({
  name: 'Mortek Guard',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 9,
      attacks: 2,
      toHit: 3,
      toWound: 4,
      rend: 1,
      damage: 1,
      modifiers: [
        new LeaderBonus({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
        new Exploding({ characteristic: C.TO_HIT, on: 6, extraHits: 1, unmodified: true }),
      ],
    }),
    new WeaponProfile({ numModels: 1, attacks: 2, toHit: 3, toWound: 3, rend: 1, damage: 1 }),
  ],
})

export const NecropolisStalkers = new Unit({
  name: 'Necropolis Stalkers',
  weaponProfiles: [
    new WeaponProfile({ numModels: 1, attacks: 3, toHit: 3, toWound: 4, rend: 2, damage: 2 }),
    new WeaponProfile({ numModels: 2, attacks: 5, toHit: 3, toWound: 3, rend: 1, damage: 1 }),
  ],
})

export const NecropolisStalkersPrecision = new Unit({
  name: 'Necropolis Stalkers (Precision)',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 1,
      attacks: 3,
      toHit: 3,
      toWound: 4,
      rend: 2,
      damage: 2,
      modifiers: [
        new Bonus({ characteristic: C.REND, bonus: 1 }),
        new Bonus({ characteristic: C.DAMAGE, bonus: 1 }),
      ],
    }),
    new WeaponProfile({
      numModels: 2,
      attacks: 5,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 1,
      modifiers: [
        new Bonus({ characteristic: C.REND, bonus: 1 }),
        new Bonus({ characteristic: C.DAMAGE, bonus: 1 }),
      ],
    }),
  ],
})
