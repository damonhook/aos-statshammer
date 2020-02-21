import * as selectors from 'store/selectors/targetModifiersSelectors';

import { state, targetModifiers } from './utils/testState';

describe('targetModifiersSelectors', () => {
  test('targetModifiersSelectors', () => {
    expect(selectors.targetModifiersSelector(state)).toEqual(targetModifiers);
  });

  test('targetModifierItemsSelector', () => {
    expect(selectors.targetModifierItemsSelector(state)).toEqual(targetModifiers.items);
  });

  test('targetModifierByIdSelector', () => {
    const getModifierById = selectors.targetModifierByIdSelector(state);
    expect(typeof getModifierById).toBe('function');
    const expected = {
      id: 'TARGET_REROLL',
      name: 'Target Reroll',
      description: 'Reroll Save Rolls',
      options: {},
    };
    expect(getModifierById('TARGET_REROLL')).toEqual(expected);
    expect(getModifierById('UNKNOWN')).toBeUndefined();
  });
});
