import { IStore } from 'types/store';

/**
 * Get the current target state
 */
export const targetSelector = (state: IStore) => state.target;
