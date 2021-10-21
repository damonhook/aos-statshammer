import { TargetAbilityData, TargetAbilityLookup } from 'abilities/target'
import { Characteristic as C, ProcessorSaveResults, Saves } from 'common'
import { D6 } from 'models/dice'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'
import { combineResults, createResults, roundResults } from 'utils/processorUtils'

export class UnitAverageProcessor {
  unit: Unit
  targetAbilities: TargetAbilityLookup

  constructor(unit: Unit, targetAbilities: TargetAbilityLookup | TargetAbilityData = []) {
    this.unit = unit
    this.targetAbilities =
      targetAbilities instanceof TargetAbilityLookup
        ? targetAbilities
        : new TargetAbilityLookup(targetAbilities)
  }

  public calculateAverageDamage(prec: number = 3): ProcessorSaveResults {
    const results = combineResults(
      ...this.unit.weapons.map(weapon => {
        const processor = new WeaponAverageProcessor(weapon, this.targetAbilities)
        return processor.calculateAverageDamage()
      })
    )
    return roundResults(results, prec)
  }
}

export class WeaponAverageProcessor {
  weapon: Weapon
  targetAbilities: TargetAbilityLookup

  constructor(weapon: Weapon, targetAbilities: TargetAbilityLookup | TargetAbilityData = []) {
    this.weapon = weapon
    this.targetAbilities =
      targetAbilities instanceof TargetAbilityLookup
        ? targetAbilities
        : new TargetAbilityLookup(targetAbilities)
  }

  public calculateAverageDamage(): ProcessorSaveResults {
    let numModels = this.weapon.numModels
    let attacks = 0

    let leaderDamage = createResults()
    const leaderAbilities = this.weapon.abilities.leaderBonus
    if (leaderAbilities && leaderAbilities.length) {
      if (leaderAbilities.length == 1 && leaderAbilities[0].characteristic === C.ATTACKS) {
        attacks += leaderAbilities[0].numLeaders * leaderAbilities[0].bonus.average
      } else {
        const leaderWeapon = this.weapon.getLeaderWeapon()
        const leaderProcessor = new WeaponAverageProcessor(leaderWeapon, this.targetAbilities)
        leaderDamage = leaderProcessor.calculateAverageDamage()
        numModels = Math.max(numModels - leaderWeapon.numModels, 0)
      }
    }

    attacks += numModels * (this.weapon.attacks.average + this.resolveBonusAbility(C.ATTACKS))
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
    const { toHit, toWound } = this.weapon
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusAbility(key)
    const newBase = base + this.getNumRerolls(base, key, target, bonuses)

    let result = newBase * D6.getProbability(Math.max(target - bonuses, 2)) // number of hits / wounds

    // Exploding Ability
    const explodingAbility = this.weapon.abilities.exploding.get(key)
    if (explodingAbility) {
      const abilityTarget = explodingAbility.unmodified
        ? explodingAbility.on
        : Math.max(explodingAbility.on - bonuses, 2)
      const extra = newBase * D6.getProbability(abilityTarget) * explodingAbility.extraHits.average
      result += extra
    }

    // Mortal Wounds Ability
    let mortalDamage = createResults()
    const mortalAbility = this.weapon.abilities.mortalWounds.get(key)
    if (mortalAbility) {
      const abilityTarget = mortalAbility.unmodified
        ? mortalAbility.on
        : Math.max(mortalAbility.on - bonuses, 2)
      const numMortals = newBase * D6.getProbability(abilityTarget)
      mortalDamage = createResults(this.resolveFNP(numMortals * mortalAbility.mortalWounds.average, true))
      if (!mortalAbility.inAddition) result = Math.max(result - numMortals, 0)
    }

    // Conditional Bonus Ability
    let cbDamage = createResults()
    const cbAbility = this.weapon.abilities.conditionalBonus.get(key)
    if (cbAbility) {
      const bonusWeapon = this.weapon.getConditionalBonusWeapon(cbAbility)
      const bonusProcessor = new WeaponAverageProcessor(bonusWeapon, this.targetAbilities)
      const abilityTarget = cbAbility.unmodified ? cbAbility.on : Math.max(cbAbility.on - bonuses, 2)
      const numBonuses = newBase * D6.getProbability(abilityTarget)
      result = Math.max(result - numBonuses, 0)
      cbDamage =
        key === C.TO_HIT
          ? bonusProcessor.calculateWoundsStep(numBonuses)
          : bonusProcessor.calculateSavesStep(numBonuses)
    }

    return combineResults(next(Math.max(result, 0)), mortalDamage, cbDamage)
  }

  private calculateSavesStep(wounds: number): ProcessorSaveResults {
    const etherealAbility = this.targetAbilities.ethereal.get()
    const rend = !etherealAbility ? Math.max(this.weapon.rend + this.resolveBonusAbility(C.REND), 0) : 0

    const results = createResults()
    Saves.forEach(save => {
      let unsavedWounds = wounds
      const bonuses = this.resolveBonusAbility(C.SAVE) - rend
      const saveWithBonuses = Math.max(save - bonuses, 2)
      if (saveWithBonuses && saveWithBonuses < 7) {
        const numRerolls = this.getNumRerolls(wounds, C.SAVE, save, bonuses)
        unsavedWounds = Math.max(wounds - numRerolls, 0) * D6.getInverseProbability(saveWithBonuses)
      }
      const damagePerWound = Math.max(this.weapon.damage.average, 0) + this.resolveBonusAbility(C.DAMAGE)
      results[save] = this.resolveFNP(unsavedWounds * damagePerWound)
    })
    return results
  }

  private resolveFNP(damage: number, isMortalWounds = false): number {
    const abilities = this.targetAbilities.fnp.getAll()
    abilities.push(...(isMortalWounds ? this.targetAbilities.mortalNegate.getAll() : []))
    if (abilities && abilities.length) {
      const ability = abilities.reduce((acc, m) => (m.on < acc.on ? m : acc), abilities[0])
      const Saves = damage * D6.getProbability(ability.on)
      return Math.max(damage - Saves, 0)
    }
    return damage
  }

  private resolveBonusAbility(key: C): number {
    const ability = this.weapon.abilities.bonus.getAll(key)
    return ability.reduce((acc, a) => acc + a.bonus.average, 0)
  }

  private getNumRerolls(base: number, key: C, target: number, bonuses: number = 0): number {
    const getAbility = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.weapon.abilities[name].get(key) : this.targetAbilities[name].get()

    if (getAbility('reroll', key))
      return base * D6.getInverseProbability(bonuses >= 0 ? target - bonuses : target)
    if (getAbility('rerollFailed', key)) return base * D6.getInverseProbability(target)
    if (getAbility('rerollOnes', key)) return (base * 1) / D6.sides
    return 0
  }
}

export default UnitAverageProcessor
