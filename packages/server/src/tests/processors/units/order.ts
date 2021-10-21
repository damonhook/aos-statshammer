import LeaderBonus from 'abilities/weapon/LeaderBonus'
import MortalWounds from 'abilities/weapon/MortalWounds'
import Reroll from 'abilities/weapon/Reroll'
import { Characteristic as C } from 'common'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'

export const KurnothHunters = new Unit({
  name: 'Kurnoth Hunters',
  weapons: [
    new Weapon({
      numModels: 3,
      attacks: 4,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 2,
      abilities: [
        new LeaderBonus({ characteristic: C.TO_HIT, numLeaders: 1, bonus: 1 }),
        new MortalWounds({
          characteristic: C.TO_WOUND,
          on: 6,
          mortalWounds: 1,
          inAddition: true,
          unmodified: true,
        }),
      ],
    }),
  ],
})

export const Gotrek = new Unit({
  name: 'Gotrek Gurnisson',
  weapons: [
    new Weapon({
      numModels: 1,
      attacks: 6,
      toHit: 3,
      toWound: 3,
      rend: 2,
      damage: 3,
      abilities: [
        new Reroll({ characteristic: C.TO_HIT }),
        new Reroll({ characteristic: C.TO_WOUND }),
        new MortalWounds({
          characteristic: C.TO_HIT,
          on: 6,
          mortalWounds: 'D6',
          unmodified: true,
          inAddition: true,
        }),
      ],
    }),
  ],
})
