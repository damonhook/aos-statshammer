import { Characteristic as C } from 'common'
import ConditionalBonus from 'models/modifiers/ConditionalBonus'
import Reroll from 'models/modifiers/Reroll'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'

export const PlagueMonksPre2019 = new Unit({
  name: 'Plague Monks (Pre 2019 FAQ)',
  weaponProfiles: [
    new WeaponProfile({
      numModels: 20,
      attacks: 2,
      toHit: 4,
      toWound: 4,
      rend: 0,
      damage: 1,
      modifiers: [
        new Reroll({ characteristic: C.TO_HIT }),
        new ConditionalBonus({
          characteristic: C.TO_HIT,
          bonusToCharacteristic: C.REND,
          bonus: 1,
          unmodified: true,
        }),
        new ConditionalBonus({
          characteristic: C.TO_WOUND,
          bonusToCharacteristic: C.DAMAGE,
          bonus: 1,
          unmodified: true,
        }),
      ],
    }),
  ],
})
