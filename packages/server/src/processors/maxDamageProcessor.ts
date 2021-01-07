import { WeaponProfile } from 'models/weaponProfile'
import { Target } from 'models/target'
import { Characteristic as C } from 'common'
import { D6 } from 'models/dice'

export default class MaxDamageProcessor {
  profile: WeaponProfile
  target: Target

  constructor(profile: WeaponProfile, target: Target) {
    this.profile = profile
    this.target = target
  }

  public calculateMaxDamage(): number {
    return 0
  }
}
