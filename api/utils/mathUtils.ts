import 'regenerator-runtime/runtime';

/**
 * Create an array from one number to another (e.g: `range(2, 4)` => `[2, 3, 4]`)
 * @param start The number to start at
 * @param end The number to end at
 */
export function* range(start = 0, end = 0, step = 1) {
  if (start >= end) return;
  yield start;
  yield* range(Number(start + step), end, step);
}

export const getRandomInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
