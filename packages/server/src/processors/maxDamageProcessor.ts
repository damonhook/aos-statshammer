import { Characteristic as C } from 'common'
import { Unit } from 'models/unit'
import { Weapon } from 'models/weapon'

export class UnitMaxProcessor {
  unit: Unit

  constructor(unit: Unit) {
    this.unit = unit
  }

  public calculateMaxDamage(): number {
    return this.unit.weapons.reduce((sum, weapon) => {
      const processor = new WeaponMaxProcessor(weapon)
      return sum + processor.calculateMaxDamage()
    }, 0)
  }
}

export class WeaponMaxProcessor {
  weapon: Weapon

  constructor(weapon: Weapon) {
    this.weapon = weapon
  }

  public calculateMaxDamage(): number {
    let numModels = this.weapon.numModels

    let extra = 0
    const leaderAbilities = this.weapon.abilities.leaderBonus
    if (leaderAbilities && leaderAbilities.length) {
      const leaderWeapon = this.weapon.getLeaderWeapon()
      const leaderProcessor = new WeaponMaxProcessor(leaderWeapon)
      extra += leaderProcessor.calculateMaxDamage()
      numModels = Math.max(numModels - leaderWeapon.numModels, 0)
    }

    const max = numModels * this.getMaxDamageForModel()
    return max + extra
  }

  private getMaxDamageForModel(): number {
    let maxRolls = this.weapon.attacks.max + this.resolveBonusAbility(C.ATTACKS)
    maxRolls += this.resolveExplodingAbilities(maxRolls)

    let maxDamagePerRoll = this.weapon.damage.max + this.resolveBonusAbility(C.DAMAGE)
    maxDamagePerRoll += this.resolveConditionalBonusAbilities()

    return maxRolls * this.resolveMortalWoundsAbility(maxDamagePerRoll)
  }

  private resolveBonusAbility(key: C): number {
    const abilities = this.weapon.abilities.bonus.getAll(key)
    return abilities.reduce((acc, a) => acc + a.bonus.max, 0)
  }

  private resolveExplodingAbilities(base: number): number {
    const total = this.weapon.abilities.exploding.reduce((acc, a) => acc + acc * a.extraHits.max, base)
    return Math.max(total - base, 0)
  }

  private resolveMortalWoundsAbility(currentMax: number): number {
    return this.weapon.abilities.mortalWounds.reduce((acc, a) => {
      const abilityMax = a.mortalWounds.max
      if (a.inAddition) return acc + abilityMax
      return Math.max(acc, abilityMax)
    }, currentMax)
  }

  private resolveConditionalBonusAbilities(): number {
    const abilities = this.weapon.abilities.conditionalBonus.filter(a => a.bonusToCharacteristic === C.DAMAGE)
    if (abilities) return abilities.reduce((acc, a) => acc + a.bonus.max, 0)
    return 0
  }
}

export default UnitMaxProcessor
