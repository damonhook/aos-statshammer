import * as selectors from 'store/selectors/targetSelectors';

import { state, target } from './testState';

describe('targetSelectors', () => {
  test('targetSelector', () => {
    expect(selectors.targetSelector(state)).toEqual(target);
  });

  test('targetAppliedModifiersSelector', () => {
    expect(selectors.targetAppliedModifiersSelector(state)).toEqual(target.modifiers);
  });

  test('getSanitizedTargetSelector', () => {
    expect(selectors.getSanitizedTargetSelector(state)).toEqual({
      modifiers: [
        {
          id: 'MOD_ID_0',
          uuid: '0',
          active: true,
          error: false,
          options: { characteristic: 'to_hit' },
        },
      ],
    });
  });
});
