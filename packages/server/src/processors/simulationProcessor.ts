import { Characteristic as C, ProcessorSaveResults, Saves } from 'common'
import { D6 } from 'models/dice'
import { TargetModifierData, TargetModifierLookup } from 'models/targetModifiers'
import { Unit } from 'models/unit'
import { WeaponProfile } from 'models/weaponProfile'
import { combineResults, createResults } from 'utils/processorUtils'

export class UnitSimulationProcessor {
  unit: Unit
  targetModifiers: TargetModifierLookup

  constructor(unit: Unit, targetModifiers: TargetModifierLookup | TargetModifierData = []) {
    this.unit = unit
    this.targetModifiers =
      targetModifiers instanceof TargetModifierLookup
        ? targetModifiers
        : new TargetModifierLookup(targetModifiers)
  }

  public simulateDamage(): ProcessorSaveResults {
    return combineResults(
      ...this.unit.weaponProfiles.map(profile => {
        const processor = new ProfileSimulationProcessor(profile, this.targetModifiers)
        return processor.simulateDamage()
      })
    )
  }
}

export class ProfileSimulationProcessor {
  profile: WeaponProfile
  targetModifiers: TargetModifierLookup

  constructor(profile: WeaponProfile, targetModifiers: TargetModifierLookup | TargetModifierData = []) {
    this.profile = profile
    this.targetModifiers =
      targetModifiers instanceof TargetModifierLookup
        ? targetModifiers
        : new TargetModifierLookup(targetModifiers)
  }

  public simulateDamage(): ProcessorSaveResults {
    let numModels = this.profile.numModels
    let attacks = 0

    let leaderDamage = createResults()
    const leaderMods = this.profile.modifiers.leaderBonus
    if (leaderMods && leaderMods.length) {
      if (leaderMods.length == 1 && leaderMods[0].characteristic === C.ATTACKS) {
        attacks += leaderMods[0].numLeaders * leaderMods[0].bonus.roll()
      } else {
        const leaderProfile = this.profile.getLeaderProfile()
        const leaderProcessor = new ProfileSimulationProcessor(leaderProfile, this.targetModifiers)
        leaderDamage = leaderProcessor.simulateDamage()
        numModels = Math.max(numModels - leaderProfile.numModels, 0)
      }
    }

    attacks += numModels * (this.profile.attacks.average + this.resolveBonusModifier(C.ATTACKS))
    const baseDamage = combineResults(...Array.from({ length: attacks }).map(() => this.simulateHitRoll()))
    return combineResults(baseDamage, leaderDamage)
  }

  private simulateHitRoll(): ProcessorSaveResults {
    return this.simulateRollStep(C.TO_HIT, () => this.simulateWoundRoll())
  }

  private simulateWoundRoll(): ProcessorSaveResults {
    return this.simulateRollStep(C.TO_WOUND, () => this.simulateSaveRoll())
  }

  private simulateRollStep(
    key: C.TO_HIT | C.TO_WOUND,
    next: () => ProcessorSaveResults
  ): ProcessorSaveResults {
    const { toHit, toWound } = this.profile
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusModifier(key)

    const unmodifiedRoll = this.withRerolls(key, target, bonuses)
    const roll = unmodifiedRoll + bonuses
    let extraDamage = createResults()

    const explodingMod = this.profile.modifiers.exploding.get(key)
    if (explodingMod && (explodingMod.unmodified ? unmodifiedRoll : roll) >= explodingMod.on) {
      extraDamage = combineResults(
        extraDamage,
        ...Array.from({ length: explodingMod.extraHits.roll() }).map(() => next())
      )
    }

    const mortalMod = this.profile.modifiers.mortalWounds.get(key)
    if (mortalMod && (mortalMod.unmodified ? unmodifiedRoll : roll) >= mortalMod.on) {
      extraDamage = combineResults(createResults(this.resolveFNPRoll(mortalMod.mortalWounds.roll(), true)))
      if (!mortalMod.inAddition) return extraDamage
    }

    // 1's always fail and 6's always succeed
    const sucess = roll !== 1 && (roll === 6 || roll >= target)
    if (sucess) {
      const cbMod = this.profile.modifiers.conditionalBonus.get(key)
      if (cbMod && (cbMod.unmodified ? unmodifiedRoll : roll) >= cbMod.on) {
        const bonusProfile = this.profile.getConditionalBonusProfile(cbMod)
        const bonusProcessor = new ProfileSimulationProcessor(bonusProfile, this.targetModifiers)
        return combineResults(
          extraDamage,
          key === C.TO_HIT ? bonusProcessor.simulateWoundRoll() : bonusProcessor.simulateSaveRoll()
        )
      }

      return combineResults(next(), extraDamage)
    }
    return extraDamage
  }

  private simulateSaveRoll(): ProcessorSaveResults {
    const etherealMod = this.targetModifiers.ethereal.get()
    const rend = !etherealMod ? Math.max(this.profile.rend + this.resolveBonusModifier(C.REND), 0) : 0

    const results = createResults()
    Saves.forEach(save => {
      const bonuses = this.resolveBonusModifier(C.SAVE) - rend
      const unmodifiedRoll = this.withRerolls(C.SAVE, save, bonuses)
      const roll = unmodifiedRoll + bonuses
      let value = 0
      if (roll < save) {
        const damage = this.profile.damage.roll() + this.resolveBonusModifier(C.DAMAGE)
        value = this.resolveFNPRoll(damage)
      }
      results[save] = value
    })
    return results
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.roll(), 0)
  }

  private withRerolls(key: C, target: number, bonuses = 0): number {
    const getModifier = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.profile.modifiers[name].get(key) : this.targetModifiers[name].get()

    const unmodifiedRoll = D6.roll()
    const roll = unmodifiedRoll + bonuses
    // 1's always fail and 6's always succeed (so always reroll 1's and never reroll 6's)
    if (roll === 1 || (roll !== 6 && roll < target)) {
      if (getModifier('reroll', key)) return D6.roll()
      if (getModifier('rerollFailed', key)) return unmodifiedRoll < target ? D6.roll() : roll
      if (getModifier('rerollOnes', key)) return roll === 1 ? D6.roll() : roll
    }
    return unmodifiedRoll
  }

  private resolveFNPRoll(damage: number, isMortalWounds = false): number {
    const mods = this.targetModifiers.fnp.getAll()
    mods.push(...(isMortalWounds ? this.targetModifiers.mortalNegate.getAll() : []))
    if (mods && mods.length) {
      const mod = mods.reduce((acc, m) => (m.on < acc.on ? m : acc), mods[0])
      return Array.from({ length: damage }).reduce<number>(acc => acc + (D6.roll() >= mod.on ? 0 : 1), 0)
    }
    return damage
  }
}

export default UnitSimulationProcessor
