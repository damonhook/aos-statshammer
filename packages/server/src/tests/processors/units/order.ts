import { Characteristic as C } from 'common'
import LeaderBonus from 'models/modifiers/LeaderBonus'
import MortalWounds from 'models/modifiers/MortalWounds'
import Reroll from 'models/modifiers/Reroll'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'

export const KurnothHunters = new Unit({
  name: 'Kurnoth Hunters',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 3,
      attacks: 4,
      toHit: 3,
      toWound: 3,
      rend: 1,
      damage: 2,
      modifiers: [
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
  weaponProfiles: [
    new WeaponProfile({
      numModels: 1,
      attacks: 6,
      toHit: 3,
      toWound: 3,
      rend: 2,
      damage: 3,
      modifiers: [
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
