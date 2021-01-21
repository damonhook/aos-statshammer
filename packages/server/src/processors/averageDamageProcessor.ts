import { WeaponProfile } from 'models/weaponProfile'
import { Target } from 'models/target'
import { Characteristic as C } from 'common'
import { D6 } from 'models/dice'

export default class AverageDamageProcessor {
  profile: WeaponProfile
  target: Target

  constructor(profile: WeaponProfile, target: Target) {
    this.profile = profile
    this.target = target
  }

  public calculateAverageDamage(): number {
    let numModels = this.profile.numModels
    let attacks = 0
    let extraDamage = 0

    const leaderMods = this.profile.modifiers.leaderBonus
    if (leaderMods && leaderMods.length) {
      if (leaderMods.length == 1 && leaderMods[0].characteristic === C.ATTACKS) {
        attacks += leaderMods[0].numLeaders * leaderMods[0].bonus.average
      } else {
        const leaderProfile = this.profile.getLeaderProfile()
        const leaderProcessor = new AverageDamageProcessor(leaderProfile, this.target)
        extraDamage += leaderProcessor.calculateAverageDamage()
        numModels = Math.max(numModels - leaderProfile.numModels, 0)
      }
    }

    attacks += numModels * (this.profile.attacks.average + this.resolveBonusModifier(C.ATTACKS))
    return this.calculateHitsStep(attacks) + extraDamage
  }

  private calculateHitsStep(attacks: number): number {
    const [hits, extraDamage] = this.calculateRollStep(attacks, C.TO_HIT)
    return this.calculateWoundsStep(hits) + extraDamage
  }

  private calculateWoundsStep(hits: number): number {
    const [wounds, extraDamage] = this.calculateRollStep(hits, C.TO_WOUND)
    return this.calculateSavesStep(wounds) + extraDamage
  }

  private calculateSavesStep(wounds: number): number {
    const etherealMod = this.target.modifiers.ethereal.get()
    const rend = etherealMod ? Math.max(this.profile.rend + this.resolveBonusModifier(C.REND), 0) : 0
    const unmodifiedSave = Math.max(this.target.save, 2)
    const save = Math.max(unmodifiedSave + this.resolveBonusModifier(C.SAVE) + rend, 2)
    let unsavedWounds = wounds
    if (save && save < 7) {
      const numRerolls = this.getNumRerolls(wounds, C.SAVE, save, unmodifiedSave)
      unsavedWounds = (wounds - numRerolls) * D6.getInverseProbability(save)
    }
    return this.calculateDamageStep(Math.max(unsavedWounds, 0))
  }

  private calculateDamageStep(unsavedWounds: number): number {
    let damagePerWound = Math.max(this.profile.damage.average, 0)
    damagePerWound += this.resolveBonusModifier(C.DAMAGE)
    return this.resolveFNP(damagePerWound * unsavedWounds)
  }

  private resolveFNP(damage: number, isMortalWounds: boolean = false): number {
    const mods = this.target.modifiers.fnp.getAll()
    mods.push(...(isMortalWounds ? this.target.modifiers.mortalNegate.getAll() : []))
    if (mods && mods.length) {
      const mod = mods.reduce((acc, m) => (m.on < acc.on ? m : acc), mods[0])
      const saves = damage * D6.getProbability(mod.on)
      return Math.max(damage - saves, 0)
    }
    return damage
  }

  private calculateRollStep(base: number, key: C.TO_HIT | C.TO_WOUND): [number, number] {
    const { toHit, toWound } = this.profile
    const unmodifiedValue = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const value = Math.max(unmodifiedValue - this.resolveBonusModifier(key), 2)
    const numRerolls = this.getNumRerolls(base, key, value, unmodifiedValue)
    let result = (base + numRerolls) * D6.getProbability(value) // number of hits / wounds
    result += this.resolveExplodingModifier(base, key)

    const [mortalDamage, mortalReduction] = this.resolveMortalWoundsModifier(base, key)
    const [bonusDamage, bonusReduction] = this.resolveConditionalBonusModifier(base, key)
    const extraDamage = mortalDamage + bonusDamage
    result = Math.max(result - mortalReduction - bonusReduction, 0)
    return [result, extraDamage]
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.average, 0)
  }

  private getNumRerolls(base: number, key: C, value: number, unmodifiedValue: number): number {
    const getModifier = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.profile.modifiers[name].get(key) : this.target.modifiers[name].get()

    if (getModifier('reroll', key)) return base * D6.getInverseProbability(value)
    if (getModifier('rerollFailed', key))
      return base * D6.getInverseProbability(Math.min(value, unmodifiedValue))
    if (getModifier('rerollOnes', key)) return (base * 1) / D6.sides
    return 0
  }

  private resolveExplodingModifier(base: number, key: C): number {
    const mod = this.profile.modifiers.exploding.get(key)
    return mod ? base * D6.getProbability(mod.on) * mod.extraHits.average : 0
  }

  private resolveMortalWoundsModifier(base: number, key: C): [number, number] {
    const mod = this.profile.modifiers.mortalWounds.get(key)
    if (mod) {
      const mortals = base * D6.getProbability(mod.on)
      let mortalDamage = mortals * mod.mortalWounds.average
      mortalDamage = this.resolveFNP(mortalDamage, true)
      return [mortalDamage, mortals]
    }
    return [0, 0]
  }

  private resolveConditionalBonusModifier(base: number, key: C.TO_HIT | C.TO_WOUND): [number, number] {
    const mod = this.profile.modifiers.conditionalBonus.get(key)
    if (mod) {
      const bonusProfile = this.profile.getConditionalBonusProfile(mod)
      const bonusProcessor = new AverageDamageProcessor(bonusProfile, this.target)
      const bonuses = base * D6.getProbability(mod.on)
      const bonusDamage =
        key === C.TO_HIT
          ? bonusProcessor.calculateWoundsStep(bonuses)
          : bonusProcessor.calculateSavesStep(bonuses)
      return [bonusDamage, bonuses]
    }
    return [0, 0]
  }
}
