import * as selectors from 'store/selectors/unitsSelectors';

import { state, units } from './utils/testState';
import * as testUnits from './utils/testUnits';

describe('unitsSelectors', () => {
  test('unitsSelector', () => {
    expect(selectors.unitsSelector(state)).toEqual(units);
  });

  test('unitByIndexSelector', () => {
    const getUnitByIndex = selectors.unitByIndexSelector(state);
    expect(typeof getUnitByIndex).toEqual('function');
    expect(getUnitByIndex(0)).toEqual(units[0]);
    expect(getUnitByIndex(999)).toBeUndefined();
  });

  test('numUnitsSelector', () => {
    expect(selectors.numUnitsSelector(state)).toEqual(4);
  });

  test('addUnitEnabledSelector', () => {
    const minState = { ...state, units: [...Array(1)].map(() => testUnits.unit1) };
    const maxState = { ...state, units: [...Array(99)].map(() => testUnits.unit1) };
    expect(selectors.addUnitEnabledSelector(minState)).toEqual(true);
    expect(selectors.addUnitEnabledSelector(maxState)).toEqual(false);
  });

  test('unitIndexByUuidSelector', () => {
    const getUnitIndexByUuid = selectors.unitIndexByUuidSelector(state);
    expect(typeof getUnitIndexByUuid).toEqual('function');
    expect(getUnitIndexByUuid('unit-0')).toEqual(0);
    expect(getUnitIndexByUuid('not-a-unit')).toEqual(-1);
  });

  test('unitByUuidSelector', () => {
    const getUnitByUuid = selectors.unitByUuidSelector(state);
    expect(typeof getUnitByUuid).toEqual('function');
    expect(getUnitByUuid('unit-0')).toEqual(units[0]);
    expect(getUnitByUuid('not-a-unit')).toBeUndefined();
  });

  test('unitNamesSelector', () => {
    expect(selectors.unitNamesSelector(state)).toEqual(['Test Unit 1', 'Test Unit 2', 'Test Unit 3']);
  });

  test('getSanitizedUnitsSelector', () => {
    const getSanitizedUnits = selectors.getSanitizedUnitsSelector(state);
    expect(typeof getSanitizedUnits).toEqual('function');

    const expectedUsingName = [
      testUnits.sanitizedUnit1Name,
      testUnits.sanitizedUnit2Name,
      testUnits.sanitizedUnit3Name,
    ];
    expect(getSanitizedUnits(false)).toEqual(expectedUsingName);

    const expectedUsingUuid = [
      testUnits.sanitizedUnit1Uuid,
      testUnits.sanitizedUnit2Uuid,
      testUnits.sanitizedUnit3Uuid,
    ];
    expect(getSanitizedUnits(true)).toEqual(expectedUsingUuid);
  });
});
