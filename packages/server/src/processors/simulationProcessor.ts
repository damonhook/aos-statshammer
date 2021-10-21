import { TargetAbilityData, TargetAbilityLookup } from 'abilities/target'
import { Characteristic as C, ProcessorSaveResults, Saves } from 'common'
import { D6 } from 'models/dice'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'
import { combineResults, createResults } from 'utils/processorUtils'

export class UnitSimulationProcessor {
  unit: Unit
  targetAbilities: TargetAbilityLookup

  constructor(unit: Unit, targetAbilities: TargetAbilityLookup | TargetAbilityData = []) {
    this.unit = unit
    this.targetAbilities =
      targetAbilities instanceof TargetAbilityLookup
        ? targetAbilities
        : new TargetAbilityLookup(targetAbilities)
  }

  public simulateDamage(): ProcessorSaveResults {
    return combineResults(
      ...this.unit.weapons.map(weapon => {
        const processor = new WeaponSimulationProcessor(weapon, this.targetAbilities)
        return processor.simulateDamage()
      })
    )
  }
}

export class WeaponSimulationProcessor {
  weapon: Weapon
  targetAbilities: TargetAbilityLookup

  constructor(weapon: Weapon, targetAbilities: TargetAbilityLookup | TargetAbilityData = []) {
    this.weapon = weapon
    this.targetAbilities =
      targetAbilities instanceof TargetAbilityLookup
        ? targetAbilities
        : new TargetAbilityLookup(targetAbilities)
  }

  public simulateDamage(): ProcessorSaveResults {
    let numModels = this.weapon.numModels
    let attacks = 0

    let leaderDamage = createResults()
    const leaderAbilities = this.weapon.abilities.leaderBonus
    if (leaderAbilities && leaderAbilities.length) {
      if (leaderAbilities.length == 1 && leaderAbilities[0].characteristic === C.ATTACKS) {
        attacks += leaderAbilities[0].numLeaders * leaderAbilities[0].bonus.roll()
      } else {
        const leaderWeapon = this.weapon.getLeaderWeapon()
        const leaderProcessor = new WeaponSimulationProcessor(leaderWeapon, this.targetAbilities)
        leaderDamage = leaderProcessor.simulateDamage()
        numModels = Math.max(numModels - leaderWeapon.numModels, 0)
      }
    }

    attacks += numModels * (this.weapon.attacks.average + this.resolveBonusAbility(C.ATTACKS))
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
    const { toHit, toWound } = this.weapon
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusAbility(key)

    const unmodifiedRoll = this.withRerolls(key, target, bonuses)
    const roll = unmodifiedRoll + bonuses
    let extraDamage = createResults()

    const explodingAbility = this.weapon.abilities.exploding.get(key)
    if (explodingAbility && (explodingAbility.unmodified ? unmodifiedRoll : roll) >= explodingAbility.on) {
      extraDamage = combineResults(
        extraDamage,
        ...Array.from({ length: explodingAbility.extraHits.roll() }).map(() => next())
      )
    }

    const mortalAbility = this.weapon.abilities.mortalWounds.get(key)
    if (mortalAbility && (mortalAbility.unmodified ? unmodifiedRoll : roll) >= mortalAbility.on) {
      extraDamage = combineResults(
        createResults(this.resolveFNPRoll(mortalAbility.mortalWounds.roll(), true))
      )
      if (!mortalAbility.inAddition) return extraDamage
    }

    // 1's always fail and 6's always succeed
    const sucess = roll !== 1 && (roll === 6 || roll >= target)
    if (sucess) {
      const cbAbility = this.weapon.abilities.conditionalBonus.get(key)
      if (cbAbility && (cbAbility.unmodified ? unmodifiedRoll : roll) >= cbAbility.on) {
        const bonusWeapon = this.weapon.getConditionalBonusWeapon(cbAbility)
        const bonusProcessor = new WeaponSimulationProcessor(bonusWeapon, this.targetAbilities)
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
    const etherealAbility = this.targetAbilities.ethereal.get()
    const rend = !etherealAbility ? Math.max(this.weapon.rend + this.resolveBonusAbility(C.REND), 0) : 0

    const results = createResults()
    Saves.forEach(save => {
      const bonuses = this.resolveBonusAbility(C.SAVE) - rend
      const unmodifiedRoll = this.withRerolls(C.SAVE, save, bonuses)
      const roll = unmodifiedRoll + bonuses
      let value = 0
      if (roll < save) {
        const damage = this.weapon.damage.roll() + this.resolveBonusAbility(C.DAMAGE)
        value = this.resolveFNPRoll(damage)
      }
      results[save] = value
    })
    return results
  }

  private resolveBonusAbility(key: C): number {
    const abilities = this.weapon.abilities.bonus.getAll(key)
    return abilities.reduce((acc, a) => acc + a.bonus.roll(), 0)
  }

  private withRerolls(key: C, target: number, bonuses = 0): number {
    const getAbility = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.weapon.abilities[name].get(key) : this.targetAbilities[name].get()

    const unmodifiedRoll = D6.roll()
    const roll = unmodifiedRoll + bonuses
    // 1's always fail and 6's always succeed (so always reroll 1's and never reroll 6's)
    if (roll === 1 || (roll !== 6 && roll < target)) {
      if (getAbility('reroll', key)) return D6.roll()
      if (getAbility('rerollFailed', key)) return unmodifiedRoll < target ? D6.roll() : roll
      if (getAbility('rerollOnes', key)) return roll === 1 ? D6.roll() : roll
    }
    return unmodifiedRoll
  }

  private resolveFNPRoll(damage: number, isMortalWounds = false): number {
    const abilities = this.targetAbilities.fnp.getAll()
    abilities.push(...(isMortalWounds ? this.targetAbilities.mortalNegate.getAll() : []))
    if (abilities && abilities.length) {
      const ability = abilities.reduce((acc, a) => (a.on < acc.on ? a : acc), abilities[0])
      return Array.from({ length: damage }).reduce<number>(acc => acc + (D6.roll() >= ability.on ? 0 : 1), 0)
    }
    return damage
  }
}

export default UnitSimulationProcessor
