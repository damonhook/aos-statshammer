import * as selectors from 'store/selectors/configSelectors';

import { config, state } from './utils/testState';

describe('configSelectors', () => {
  test('configSelector', () => {
    expect(selectors.configSelector(state)).toEqual(config);
  });

  test('desktopGraphListSelector', () => {
    expect(selectors.desktopGraphListSelector(state)).toEqual(false);
  });

  test('numSimulationsSelector', () => {
    expect(selectors.numSimulationsSelector(state)).toEqual(5000);
  });
});
