import * as u from './utils/units';

describe('MaxDamageProcessor', () => {
  test('Chainrasp Horde', () => {
    expect(u.chainraspHorde.maxDamage()).toEqual(21);
  });

  test('Mortek Guard', () => {
    expect(u.mortekGuard.maxDamage()).toEqual(40);
  });

  test('Hearthguard Berzerkers Broadaxes', () => {
    expect(u.hearthGuardBerzerkersBroadaxes.maxDamage()).toEqual(82);
  });

  test('Hearthguard Berzerkers Poleaxes', () => {
    expect(u.hearthGuardBerzerkersPoleaxes.maxDamage()).toEqual(123);
  });

  test('Necropolis Stalkers Swords /w No Aspect', () => {
    expect(u.necropolisStalkersSwordsBase.maxDamage()).toEqual(15);
  });

  test('Necropolis Stalkers Swords /w Precision Aspect', () => {
    expect(u.necropolisStalkersSwordsPrec.maxDamage()).toEqual(30);
  });

  test('Necropolis Stalkers GS + S /w No Aspect', () => {
    expect(u.necropolisStalkersBase.maxDamage()).toEqual(16);
  });

  test('Necropolis Stalkers GS + S /w Precision Aspect', () => {
    expect(u.necropolisStalkersPrec.maxDamage()).toEqual(29);
  });

  test('Gotrek Gurnisson', () => {
    expect(u.gotrek.maxDamage()).toEqual(54);
  });

  test('Spirit Hosts', () => {
    expect(u.spiritHosts.maxDamage()).toEqual(18);
  });

  test('Kurnoth Hunters Swords', () => {
    expect(u.kurnothHuntersSwords.maxDamage()).toEqual(36);
  });

  test('Plague Monks (pre Dec 2019 FAQ)', () => {
    expect(u.plagueMonksOld.maxDamage()).toEqual(80);
  });

  test('Rattling Gunners', () => {
    expect(u.rattlingGunners.maxDamage()).toEqual(12);
  });
});
