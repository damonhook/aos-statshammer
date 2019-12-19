/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {int} min The minimum value (inclusive)
 * @param {int} max The maximum value (inclusive)
 */
export const getRandomInt = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
};

/**
 * Get the mean of an array of values
 * @param {int[]} array The array of values
 */
export const getMean = (array) => (array.reduce((acc, n) => acc + n, 0) / array.length);


/**
 * Get the various stats metrics for an array of values
 * @param {int[]} array The array of values
 */
export const getMetrics = (array) => ({
  mean: getMean(array),
});
