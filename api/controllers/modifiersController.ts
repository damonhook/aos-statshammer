import { MODIFIERS } from '../models/modifiers';
import { TARGET_MODIFIERS } from '../models/targetModifiers';

/**
 * Get the list of modifiers
 */
export const getModifiers = () =>
  Object.keys(MODIFIERS).map((key) => ({
    id: key,
    ...MODIFIERS[key].metadata,
  }));

/**
 * Get the list of target modifiers
 */
export const getTargetModifiers = () =>
  Object.keys(TARGET_MODIFIERS).map((key) => ({
    id: key,
    ...TARGET_MODIFIERS[key].metadata,
  }));
