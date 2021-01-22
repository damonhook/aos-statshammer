import { Characteristic as C } from 'common'
import { WeaponProfile } from 'models/weaponProfile'

export default class MaxDamageProcessor {
  profile: WeaponProfile

  constructor(profile: WeaponProfile) {
    this.profile = profile
  }

  public calculateMaxDamage(): number {
    let numModels = this.profile.numModels

    let extra = 0
    const leaderMods = this.profile.modifiers.leaderBonus
    if (leaderMods && leaderMods.length) {
      const leaderProfile = this.profile.getLeaderProfile()
      const leaderProcessor = new MaxDamageProcessor(leaderProfile)
      extra += leaderProcessor.calculateMaxDamage()
      numModels = Math.max(numModels - leaderProfile.numModels, 0)
    }

    const max = numModels * this.getMaxDamageForModel()
    return max + extra
  }

  private getMaxDamageForModel(): number {
    let maxRolls = this.profile.attacks.max + this.resolveBonusModifier(C.ATTACKS)
    maxRolls += this.resolveExplodingModifiers(maxRolls)

    let maxDamagePerRoll = this.profile.damage.max + this.resolveBonusModifier(C.DAMAGE)
    maxDamagePerRoll += this.resolveConditionalBonusModifiers()

    const max = maxRolls * maxDamagePerRoll
    return this.resolveMortalWoundsModifier(max)
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.max, 0)
  }

  private resolveExplodingModifiers(base: number): number {
    const total = this.profile.modifiers.exploding.reduce((acc, m) => acc + acc * m.extraHits.max, base)
    return Math.max(total - base, 0)
  }

  private resolveMortalWoundsModifier(currentMax: number): number {
    return this.profile.modifiers.mortalWounds.reduce((acc, m) => {
      const modMax = m.mortalWounds.max
      if (m.inAddition) return acc + modMax
      return Math.max(acc, modMax)
    }, currentMax)
  }

  private resolveConditionalBonusModifiers(): number {
    const mods = this.profile.modifiers.conditionalBonus.filter(m => m.bonusToCharacteristic === C.DAMAGE)
    if (mods) return mods.reduce((acc, m) => acc + m.bonus.max, 0)
    return 0
  }
}
