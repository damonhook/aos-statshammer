import { WeaponProfile } from 'models/weaponProfile'
import { Target } from 'models/target'
import { Characteristic as C } from 'common'
import { D6 } from 'models/dice'

export default class SimulationProcessor {
  profile: WeaponProfile
  target: Target

  constructor(profile: WeaponProfile, target: Target) {
    this.profile = profile
    this.target = target
  }

  public simulateDamage(numSimulations: number): number {
    return 0
  }
}
