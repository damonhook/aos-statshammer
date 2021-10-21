import Bonus from 'abilities/weapon/Bonus'
import Exploding from 'abilities/weapon/Exploding'
import LeaderBonus from 'abilities/weapon/LeaderBonus'
import MortalWounds from 'abilities/weapon/MortalWounds'
import RerollFailed from 'abilities/weapon/RerollFailed'
import RerollOnes from 'abilities/weapon/RerollOnes'
import { Characteristic as C } from 'common'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'

export const ChainraspHorde = new Unit({
  name: 'Chainrasp Horde',
  weapons: [
    new Weapon({
      numModels: 10,
      attacks: 2,
      toHit: 4,
      toWound: 4,
      rend: 0,
      damage: 1,
      abilities: [new LeaderBonus({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 })],
    }),
  ],
})

export const DreadbladeHarrow = new Unit({
  name: 'Dreadblade Harrow',
  weapons: [
    new Weapon({
      numModels: 1,
      attacks: 3,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 1,
      abilities: [new RerollOnes({ characteristic: C.TO_WOUND })],
    }),
    new Weapon({ numModels: 1, attacks: 2, toHit: 4, toWound: 5, rend: 0, damage: 1 }),
  ],
})

export const CairnWraith = new Unit({
  name: 'Cairn Wraith',
  weapons: [
    new Weapon({
      numModels: 1,
      attacks: 3,
      toHit: 4,
      toWound: 3,
      rend: 1,
      damage: 2,
      abilities: [
        new RerollFailed({ characteristic: C.TO_HIT }),
        new MortalWounds({ characteristic: C.TO_HIT, on: 6, mortalWounds: 2, inAddition: false }),
      ],
    }),
  ],
})

export const SpiritHosts = new Unit({
  name: 'Spirit Hosts',
  weapons: [
    new Weapon({
      numModels: 3,
      attacks: 6,
      toHit: 5,
      toWound: 4,
      rend: 0,
      damage: 1,
      abilities: [
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
  weapons: [
    new Weapon({
      numModels: 9,
      attacks: 2,
      toHit: 3,
      toWound: 4,
      rend: 1,
      damage: 1,
      abilities: [
        new LeaderBonus({ characteristic: C.ATTACKS, numLeaders: 1, bonus: 1 }),
        new Exploding({ characteristic: C.TO_HIT, on: 6, extraHits: 1, unmodified: true }),
      ],
    }),
    new Weapon({ numModels: 1, attacks: 2, toHit: 3, toWound: 3, rend: 1, damage: 1 }),
  ],
})

export const NecropolisStalkers = new Unit({
  name: 'Necropolis Stalkers',
  weapons: [
    new Weapon({ numModels: 1, attacks: 3, toHit: 3, toWound: 4, rend: 2, damage: 2 }),
    new Weapon({ numModels: 2, attacks: 5, toHit: 3, toWound: 3, rend: 1, damage: 1 }),
  ],
})

export const NecropolisStalkersPrecision = new Unit({
  name: 'Necropolis Stalkers (Precision)',
  weapons: [
    new Weapon({
      numModels: 1,
      attacks: 3,
      toHit: 3,
      toWound: 4,
      rend: 2,
      damage: 2,
      abilities: [
        new Bonus({ characteristic: C.REND, bonus: 1 }),
        new Bonus({ characteristic: C.DAMAGE, bonus: 1 }),
      ],
    }),
    new Weapon({
      numModels: 2,
      attacks: 5,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 1,
      abilities: [
        new Bonus({ characteristic: C.REND, bonus: 1 }),
        new Bonus({ characteristic: C.DAMAGE, bonus: 1 }),
      ],
    }),
  ],
})
