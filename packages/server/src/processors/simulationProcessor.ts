import { Characteristic as C } from 'common'
import { D6 } from 'models/dice'
import { Target } from 'models/target'
import { WeaponProfile } from 'models/weaponProfile'

export default class SimulationProcessor {
  profile: WeaponProfile
  target: Target

  constructor(profile: WeaponProfile, target: Target) {
    this.profile = profile
    this.target = target
  }

  public simulateDamage(): number {
    let numModels = this.profile.numModels
    let attacks = 0
    let extraDamage = 0

    const leaderMods = this.profile.modifiers.leaderBonus
    if (leaderMods && leaderMods.length) {
      if (leaderMods.length == 1 && leaderMods[0].characteristic === C.ATTACKS) {
        attacks += leaderMods[0].numLeaders * leaderMods[0].bonus.roll()
      } else {
        const leaderProfile = this.profile.getLeaderProfile()
        const leaderProcessor = new SimulationProcessor(leaderProfile, this.target)
        extraDamage += leaderProcessor.simulateDamage()
        numModels = Math.max(numModels - leaderProfile.numModels, 0)
      }
    }

    attacks += numModels * (this.profile.attacks.average + this.resolveBonusModifier(C.ATTACKS))
    const baseDamage = Array.from({ length: attacks }).reduce<number>(acc => acc + this.simulateHitRoll(), 0)
    return baseDamage + extraDamage
  }

  private simulateHitRoll(): number {
    return this.simulateRollStep(C.TO_HIT, this.simulateWoundRoll)
  }

  private simulateWoundRoll(): number {
    return this.simulateRollStep(C.TO_WOUND, this.simulateSaveRoll)
  }

  private simulateSaveRoll(): number {
    const etherealMod = this.target.modifiers.ethereal.get()
    const rend = etherealMod ? Math.max(this.profile.rend + this.resolveBonusModifier(C.REND), 0) : 0
    const target = Math.max(this.target.save, 2)
    const bonuses = this.resolveBonusModifier(C.SAVE) - rend
    const unmodifiedRoll = this.withRerolls(C.SAVE, target, bonuses)
    const roll = unmodifiedRoll + bonuses
    if (roll >= target) return 0
    return this.simulateDamageRoll()
  }

  private simulateDamageRoll(): number {
    const damage = this.profile.damage.roll() + this.resolveBonusModifier(C.DAMAGE)
    return this.resolveFNPRoll(damage)
  }

  private simulateRollStep(key: C.TO_HIT | C.TO_WOUND, next: () => number): number {
    const { toHit, toWound } = this.profile
    const target = Math.max(key === C.TO_HIT ? toHit : toWound, 2)
    const bonuses = this.resolveBonusModifier(key)

    const unmodifiedRoll = this.withRerolls(key, target, bonuses)
    const roll = unmodifiedRoll + bonuses
    let damage = 0

    const explodingMod = this.profile.modifiers.exploding.get(key)
    if (explodingMod && (explodingMod.unmodified ? unmodifiedRoll : roll) >= explodingMod.on) {
      damage += Array.from({ length: explodingMod.extraHits.roll() }).reduce<number>(acc => acc + next(), 0)
    }

    const mortalMod = this.profile.modifiers.mortalWounds.get(key)
    if (mortalMod && (mortalMod.unmodified ? unmodifiedRoll : roll) >= mortalMod.on) {
      damage += this.resolveFNPRoll(mortalMod.mortalWounds.roll(), true)
      if (!mortalMod.inAddition) return damage
    }

    const cbMod = this.profile.modifiers.conditionalBonus.get(key)
    if (cbMod && (cbMod.unmodified ? unmodifiedRoll : roll) >= cbMod.on) {
      const bonusProfile = this.profile.getConditionalBonusProfile(cbMod)
      const bonusProcessor = new SimulationProcessor(bonusProfile, this.target)
      const bonusDamage =
        key === C.TO_HIT ? bonusProcessor.simulateWoundRoll() : bonusProcessor.simulateSaveRoll()
      return bonusDamage + damage
    }

    // 1's always fail and 6's always succeed
    return roll !== 1 && (roll === 6 || roll >= target) ? next() + damage : damage
  }

  private resolveBonusModifier(key: C): number {
    const mods = this.profile.modifiers.bonus.getAll(key)
    return mods.reduce((acc, m) => acc + m.bonus.roll(), 0)
  }

  private withRerolls(key: C, target: number, bonuses = 0): number {
    const getModifier = (name: 'reroll' | 'rerollFailed' | 'rerollOnes', key: C) =>
      key !== C.SAVE ? this.profile.modifiers[name].get(key) : this.target.modifiers[name].get()

    const unmodifiedRoll = D6.roll()
    const roll = unmodifiedRoll + bonuses
    // 1's always fail and 6's always succeed (so always reroll 1's and never reroll 6's)
    if (roll === 1 || (roll !== 6 && roll < target)) {
      if (getModifier('reroll', key)) return D6.roll()
      if (getModifier('rerollFailed', key)) return unmodifiedRoll < target ? D6.roll() : roll
      if (getModifier('rerollOnes', key)) return roll === 1 ? D6.roll() : roll
    }
    return roll
  }

  private resolveFNPRoll(damage: number, isMortalWounds = false): number {
    const mods = this.target.modifiers.fnp.getAll()
    mods.push(...(isMortalWounds ? this.target.modifiers.mortalNegate.getAll() : []))
    if (mods && mods.length) {
      const mod = mods.reduce((acc, m) => (m.on < acc.on ? m : acc), mods[0])
      return Array.from({ length: damage }).reduce<number>(acc => acc + (D6.roll() >= mod.on ? 0 : 1), 0)
    }
    return damage
  }
}
