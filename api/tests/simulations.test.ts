import { testSimulation } from './utils/runners';
import * as u from './utils/units';

describe('Simulations', () => {
  describe('Chainrasp Horde', () => {
    testSimulation(u.chainraspHorde, [5.25, 4.375, 3.5, 2.625, 1.75, 0.875]);
  });

  describe('Mortek Guard Swords', () => {
    testSimulation(u.mortekGuard, [8.806, 8.806, 7.338, 5.87, 4.403, 2.935]);
  });

  describe('Hearthguard Berzerkers Broadaxes', () => {
    testSimulation(u.hearthGuardBerzerkersBroadaxes, [36.444, 36.444, 30.37, 24.296, 18.222, 12.148]);
  });

  describe('Hearthguard Berzerkers Poleaxes', () => {
    testSimulation(u.hearthGuardBerzerkersPoleaxes, [31.889, 28.852, 25.815, 22.778, 19.741, 16.704]);
  });

  describe('Necropolis Stalkers Swords /w No Aspect', () => {
    testSimulation(u.necropolisStalkersSwordsBase, [6.667, 6.667, 5.556, 4.444, 3.333, 2.222]);
  });

  describe('Necropolis Stalkers Swords /w Precision Aspect', () => {
    testSimulation(u.necropolisStalkersSwordsPrec, [13.333, 13.333, 13.333, 11.111, 8.889, 6.667]);
  });

  describe('Necropolis Stalkers GS + S /w No Aspect', () => {
    testSimulation(u.necropolisStalkersBase, [6.444, 6.444, 5.704, 4.63, 3.556, 2.481]);
  });

  describe('Necropolis Stalkers GS + S /w Precision Aspect', () => {
    testSimulation(u.necropolisStalkersPrec, [11.889, 11.889, 11.889, 10.407, 8.426, 6.444]);
  });

  describe('Gotrek Gurnisson', () => {
    testSimulation(u.gotrek, [18.889, 18.889, 18.889, 16.519, 14.148, 11.778]);
  });

  describe('Spirit Hosts', () => {
    testSimulation(u.spiritHosts, [4.5, 4.25, 4, 3.75, 3.5, 3.25]);
  });

  describe('Kurnoth Hunters Swords', () => {
    testSimulation(u.kurnothHuntersSwords, [13.0, 13.0, 11.074, 9.148, 7.222, 5.296]);
  });

  describe('Plague Monks (pre Dec 2019 FAQ)', () => {
    testSimulation(u.plagueMonksOld, [20.0, 17.778, 14.444, 11.111, 7.778, 4.444]);
  });

  describe('Rattling Gunners', () => {
    testSimulation(u.rattlingGunners, [1.75, 1.75, 1.458, 1.167, 0.875, 0.583]);
  });
});
