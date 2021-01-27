import { Characteristic as C, ProcessorSaveResults, Saves } from 'common'
import { D6 } from 'models/dice'
import { TargetModifierData, TargetModifierLookup } from 'models/targetModifiers'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'
import { combineResults, createResults, roundResults } from 'utils/processorUtils'

export class UnitAverageProcessor {
  unit: Unit
  targetModifiers: TargetModifierLookup

  constructor(unit: Unit, targetModifiers: TargetModifierLookup | TargetModifierData = []) {
    this.unit = unit
    this.targetModifiers =
      targetModifiers instanceof TargetModifierLookup
        ? targetModifiers
        : new TargetModifierLookup(targetModifiers)
  }

  public calculateAverageDamage(prec: number = 3): ProcessorSaveResults {
    const results = combineResults(
      ...this.unit.weaponProfiles.map(profile => {
        const processor = new ProfileAverageProcessor(profile, this.targetModifiers)
        return processor.calculateAverageDamage()
      })
    )
    return roundResults(results, prec)
  }
}

export class ProfileAverageProcessor {
  profile: WeaponProfile
  targetModifiers: TargetModifierLookup

  constructor(profile: WeaponProfile, targetModifiers: TargetModifierLookup | TargetModifierData = []) {
    this.profile = profile
    this.targetModifiers =
      targetModifiers instanceof TargetModifierLookup
        ? targetModifiers
        : new TargetModifierLookup(targetModifiers)
  }

  public calculateAverageDamage(): ProcessorSaveResults {
    let numModels = this.profile.numModels
    let attacks = 0

    let leaderDamage = createResults()
    const leaderMods = this.profile.modifiers.leaderBonus
    if (leaderMods && leaderMods.length) {
      if (leaderMods.length == 1 && leaderMods[0].characteristic === C.ATTACKS) {
        attacks += leaderMods[0].numLeaders * leaderMods[0].bonus.average
      } else {
        const leaderProfile = this.profile.getLeaderProfile()
        const leaderProcessor = new ProfileAverageProcessor(leaderProfile, this.targetModifiers)
        leaderDamage = leaderProcessor.calculateAverageDamage()
        numModels = Math.max(numModels - leaderProfile.numModels, 0)
      }
    }

    attacks += numModels * (this.profile.attacks.average + this.resolveBonusModifier(C.ATTACKS))
    return combineResults(this.calculateHitsStep(attacks), leaderDamage)
  }

  private calculateHitsStep(attacks: number): ProcessorSaveResults {
    return this.calculateRollStep(attacks, C.TO_HIT, hits => this.calculateWoundsStep(hits))
  }

  private calculateWoundsStep(hits: number): ProcessorSaveResults {
    return this.calculateRollStep(hits, C.TO_WOUND, wounds => this.calculateSavesStep(wounds))
  }

  private calculateRollStep(
    base: number,
    key: C.TO_HIT | C.TO_WOUND,
    next: (value: number) => ProcessorSaveResults
  ): ProcessorSaveResults {
    const { toHit, toWound } = this.profile
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusModifier(key)
    const newBase = base + this.getNumRerolls(base, key, target, bonuses)

    let result = newBase * D6.getProbability(Math.max(target - bonuses, 2)) // number of hits / wounds

    // Exploding Modifier
    const explodingMod = this.profile.modifiers.exploding.get(key)
    if (explodingMod) {
      const modTarget = explodingMod.unmodified ? explodingMod.on : Math.max(explodingMod.on - bonuses, 2)
      const extra = newBase * D6.getProbability(modTarget) * explodingMod.extraHits.average
      result += extra
    }

    // Mortal Wounds Modifier
    let mortalDamage = createResults()
    const mortalMod = this.profile.modifiers.mortalWounds.get(key)
    if (mortalMod) {
      const modTarget = mortalMod.unmodified ? mortalMod.on : Math.max(mortalMod.on - bonuses, 2)
      const numMortals = newBase * D6.getProbability(modTarget)
      mortalDamage = createResults(this.resolveFNP(numMortals * mortalMod.mortalWounds.average, true))
      if (!mortalMod.inAddition) result -= numMortals
    }

    // Conditional Bonus Modifier
    let cbDamage = createResults()
    const cbMod = this.profile.modifiers.conditionalBonus.get(key)
    if (cbMod) {
      const bonusProfile = this.profile.getConditionalBonusProfile(cbMod)
      const bonusProcessor = new ProfileAverageProcessor(bonusProfile, this.targetModifiers)
      const modTarget = cbMod.unmodified ? cbMod.on : Math.max(cbMod.on - bonuses, 2)
      const numBonuses = newBase * D6.getProbability(modTarget)
      result -= numBonuses
      cbDamage =
        key === C.TO_HIT
          ? bonusProcessor.calculateWoundsStep(numBonuses)
          : bonusProcessor.calculateSavesStep(numBonuses)
    }

    return combineResults(next(Math.max(result, 0)), mortalDamage, cbDamage)
  }

  private calculateSavesStep(wounds: number): ProcessorSaveResults {
    const etherealMod = this.targetModifiers.ethereal.get()
    const rend = !etherealMod ? Math.max(this.profile.rend + this.resolveBonusModifier(C.REND), 0) : 0

    const results = createResults()
    Saves.forEach(save => {
      let unsavedWounds = wounds
      const bonuses = this.resolveBonusModifier(C.SAVE) - rend
      const saveWithBonuses = Math.max(save - bonuses, 2)
      if (saveWithBonuses && saveWithBonuses < 7) {
        const numRerolls = this.getNumRerolls(wounds, C.SAVE, save, bonuses)
        unsavedWounds = (wounds - numRerolls) * D6.getInverseProbability(saveWithBonuses)
      }
      const damagePerWound = Math.max(this.profile.damage.average, 0) + this.resolveBonusModifier(C.DAMAGE)
      results[save] = this.resolveFNP(unsavedWounds * damagePerWound)
    })
    return results
  }

  private resolveFNP(damage: number, isMortalWounds = false): number {
    const mods = this.targetModifiers.fnp.getAll()
    mods.push(...(isMortalWounds ? this.targetModifiers.mortalNegate.getAll() : []))
    if (mods && mods.length) {
      const mod = mods.reduce((acc, m) => (m.on < acc.on ? m : acc), mods[0])
      const Saves = damage * D6.getProbability(mod.on)
      return Math.max(damage - Saves, 0)
    }
    return damage
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.average, 0)
  }

  private getNumRerolls(base: number, key: C, target: number, bonuses: number = 0): number {
    const getModifier = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.profile.modifiers[name].get(key) : this.targetModifiers[name].get()

    if (getModifier('reroll', key))
      return base * D6.getInverseProbability(bonuses >= 0 ? target - bonuses : target)
    if (getModifier('rerollFailed', key)) return base * D6.getInverseProbability(target)
    if (getModifier('rerollOnes', key)) return (base * 1) / D6.sides
    return 0
  }
}

export default UnitAverageProcessor
