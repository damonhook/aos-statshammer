import ConditionalBonus from 'abilities/weapon/ConditionalBonus'
import Reroll from 'abilities/weapon/Reroll'
import { Characteristic as C } from 'common'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'

export const PlagueMonksPre2019 = new Unit({
  name: 'Plague Monks (Pre 2019 FAQ)',
  weapons: [
    new Weapon({
      numModels: 20,
      attacks: 2,
      toHit: 4,
      toWound: 4,
      rend: 0,
      damage: 1,
      abilities: [
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
