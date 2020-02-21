import * as selectors from 'store/selectors/modifiersSelectors';

import { modifiers, state } from './utils/testState';

describe('modifiersSelectors', () => {
  test('modifiersSelectors', () => {
    expect(selectors.modifiersSelector(state)).toEqual(modifiers);
  });

  test('modifierItemsSelector', () => {
    expect(selectors.modifierItemsSelector(state)).toEqual(modifiers.items);
  });

  test('modifierByIdSelector', () => {
    const getModifierById = selectors.modifierByIdSelector(state);
    expect(typeof getModifierById).toBe('function');
    const expected = {
      id: 'REROLL_ONES',
      name: 'Reroll Ones',
      description: 'Reroll Ones for {characteristic}',
      options: {
        characteristic: {
          type: 'choice',
          items: ['to_hit', 'to_wound'],
        },
      },
    };
    expect(getModifierById('REROLL_ONES')).toEqual(expected);
    expect(getModifierById('UNKNOWN')).toBeUndefined();
  });
});
