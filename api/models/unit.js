import WeaponProfile from './weaponProfile';

class Unit {
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

  averageDamage(target) {
    return this.weaponProfiles.reduce((acc, profile) => (acc + profile.averageDamage(target)), 0);
  }
}

export default Unit;
