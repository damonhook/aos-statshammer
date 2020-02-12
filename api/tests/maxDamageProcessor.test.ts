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
});
