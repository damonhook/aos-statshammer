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

export const getSum = (array) => array.reduce((acc, n) => acc + n, 0);

/**
 * Get the mean of an array of values
 * @param {int[]} array The array of values
 */
export const getMean = (array) => getSum(array) / array.length;

export const getSampleVariance = (array) => {
  const mean = getMean(array);
  const numerator = array.reduce((acc, n) => acc + ((n - mean) ** 2), 0);
  return numerator / array.length - 1;
};

export const getStandardDeviation = (array) => Math.sqrt(getSampleVariance(array));

/**
 * Get the various stats metrics for an array of values
 * @param {int[]} array The array of values
 */
export const getMetrics = (array, decimalPlaces = 3) => ({
  sum: parseFloat(getSum(array).toFixed(decimalPlaces)),
  mean: parseFloat(getMean(array).toFixed(decimalPlaces)),
  variance: parseFloat(getSampleVariance(array).toFixed(decimalPlaces)),
  standardDeviation: parseFloat(getStandardDeviation(array).toFixed(decimalPlaces)),
});
