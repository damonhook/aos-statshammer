import WeaponProfile from './weaponProfile';

/**
 * A class representing a single unit
 */
class Unit {
  /**
   * @param {string} name The name of the unit
   * @param {WeaponProfile[]} weaponProfiles The list of weapon profiles belonging to the unit
   */
  constructor(name, weaponProfiles) {
    this.name = name;
    this.weaponProfiles = weaponProfiles.map((profile) => {
      if (profile instanceof WeaponProfile) return profile;
      return new WeaponProfile(
        profile.num_models,
        profile.attacks,
        profile.to_hit,
        profile.to_wound,
        profile.rend,
        profile.damage,
        profile.modifiers,
      );
    });
  }

  /**
   * Calculate the average damage this unit would do against a particular target
   * @param {Target} target The target to calculate the damage against
   */
  averageDamage(target) {
    return this.weaponProfiles.reduce((acc, profile) => (acc + profile.averageDamage(target)), 0);
  }
}

export default Unit;
