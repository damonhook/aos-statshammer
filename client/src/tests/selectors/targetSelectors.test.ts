import * as selectors from 'store/selectors/targetSelectors';

import { state, target } from './utils/testState';

describe('targetSelectors', () => {
  test('targetSelector', () => {
    expect(selectors.targetSelector(state)).toEqual(target);
  });

  test('targetAppliedModifiersSelector', () => {
    expect(selectors.targetAppliedModifiersSelector(state)).toEqual(target.modifiers);
  });

  test('numTargetModifiersSelector', () => {
    expect(selectors.numTargetModifiersSelector(state)).toEqual(4);
  });

  test('getSanitizedTargetSelector', () => {
    const expected = {
      modifiers: [
        {
          id: 'TARGET_REROLL',
          uuid: '0',
          active: true,
          error: false,
          options: {},
        },
      ],
    };
    expect(selectors.getSanitizedTargetSelector(state)).toEqual(expected);
  });
});
