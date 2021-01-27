import { Characteristic as C } from 'common'
import { D6 } from 'models/dice'
import { Target } from 'models/target'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'

export class UnitAverageProcessor {
  unit: Unit
  target: Target

  constructor(unit: Unit, target: Target) {
    this.unit = unit
    this.target = target
  }

  public calculateAverageDamage(): number {
    return this.unit.weaponProfiles.reduce((sum, profile) => {
      const processor = new ProfileAverageProcessor(profile, this.target)
      return sum + processor.calculateAverageDamage()
    }, 0)
  }
}

export class ProfileAverageProcessor {
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
        const leaderProcessor = new ProfileAverageProcessor(leaderProfile, this.target)
        extraDamage += leaderProcessor.calculateAverageDamage()
        numModels = Math.max(numModels - leaderProfile.numModels, 0)
      }
    }

    attacks += numModels * (this.profile.attacks.average + this.resolveBonusModifier(C.ATTACKS))
    return this.calculateHitsStep(attacks) + extraDamage
  }

  private calculateHitsStep(attacks: number): number {
    return this.calculateRollStep(attacks, C.TO_HIT, hits => this.calculateWoundsStep(hits))
  }

  private calculateWoundsStep(hits: number): number {
    return this.calculateRollStep(hits, C.TO_WOUND, wounds => this.calculateSavesStep(wounds))
  }

  private calculateSavesStep(wounds: number): number {
    const etherealMod = this.target.modifiers.ethereal.get()
    const rend = !etherealMod ? Math.max(this.profile.rend + this.resolveBonusModifier(C.REND), 0) : 0
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

  private resolveFNP(damage: number, isMortalWounds = false): number {
    const mods = this.target.modifiers.fnp.getAll()
    mods.push(...(isMortalWounds ? this.target.modifiers.mortalNegate.getAll() : []))
    if (mods && mods.length) {
      const mod = mods.reduce((acc, m) => (m.on < acc.on ? m : acc), mods[0])
      const saves = damage * D6.getProbability(mod.on)
      return Math.max(damage - saves, 0)
    }
    return damage
  }

  private calculateRollStep(
    base: number,
    key: C.TO_HIT | C.TO_WOUND,
    next: (value: number) => number
  ): number {
    const { toHit, toWound } = this.profile
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusModifier(key)
    const newBase = base + this.getNumRerolls(base, key, target, bonuses)

    let result = newBase * D6.getProbability(Math.max(target - bonuses, 2)) // number of hits / wounds
    let extraDamage: number = 0

    // Exploding Modifier
    const explodingMod = this.profile.modifiers.exploding.get(key)
    if (explodingMod) {
      const modTarget = explodingMod.unmodified ? explodingMod.on : Math.max(explodingMod.on - bonuses, 2)
      const extra = newBase * D6.getProbability(modTarget) * explodingMod.extraHits.average
      result += extra
    }

    // Mortal Wounds Modifier
    const mortalMod = this.profile.modifiers.mortalWounds.get(key)
    if (mortalMod) {
      const modTarget = mortalMod.unmodified ? mortalMod.on : Math.max(mortalMod.on - bonuses, 2)
      const numMortals = newBase * D6.getProbability(modTarget)
      const mortalDamage = this.resolveFNP(numMortals * mortalMod.mortalWounds.average, true)
      if (!mortalMod.inAddition) result -= numMortals
      extraDamage += mortalDamage
    }

    // Conditional Bonus Modifier
    const cbMod = this.profile.modifiers.conditionalBonus.get(key)
    if (cbMod) {
      const bonusProfile = this.profile.getConditionalBonusProfile(cbMod)
      const bonusProcessor = new ProfileAverageProcessor(bonusProfile, this.target)
      const modTarget = cbMod.unmodified ? cbMod.on : Math.max(cbMod.on - bonuses, 2)
      const numBonuses = newBase * D6.getProbability(modTarget)
      result -= numBonuses
      extraDamage +=
        key === C.TO_HIT
          ? bonusProcessor.calculateWoundsStep(numBonuses)
          : bonusProcessor.calculateSavesStep(numBonuses)
    }

    return next(Math.max(result, 0)) + extraDamage
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.average, 0)
  }

  private getNumRerolls(base: number, key: C, target: number, bonuses: number = 0): number {
    const getModifier = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.profile.modifiers[name].get(key) : this.target.modifiers[name].get()

    if (getModifier('reroll', key))
      return base * D6.getInverseProbability(bonuses >= 0 ? target - bonuses : target)
    if (getModifier('rerollFailed', key)) return base * D6.getInverseProbability(target)
    if (getModifier('rerollOnes', key)) return (base * 1) / D6.sides
    return 0
  }
}

export default UnitAverageProcessor
