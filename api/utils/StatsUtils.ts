/** Returns a random integer between min (inclusive) and max (inclusive). */
export const getRandomInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

export const getSum = (array: number[]) => array.reduce((acc, n) => acc + n, 0);

export const getMax = (array: number[]) => Math.max(...array);

/** Get the mean of an array of values */
export const getMean = (array: number[]) => getSum(array) / array.length;

export const getMedian = (array: number[]) => {
  array.sort((a, b) => a - b);
  const mid = array.length / 2;
  return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
};

export const getSampleVariance = (array: number[]) => {
  const mean = getMean(array);
  const numerator = array.reduce((acc, n) => acc + (n - mean) ** 2, 0);
  return numerator / array.length - 1;
};

export const getStandardDeviation = (array: number[]) => Math.sqrt(getSampleVariance(array));

/**
 * Get the various stats metrics for an array of values
 * @param {int[]} array The array of values
 */
export const getMetrics = (array: number[], decimalPlaces = 3) => ({
  max: Number(getMax(array)),
  sum: parseFloat(getSum(array).toFixed(decimalPlaces)),
  mean: parseFloat(getMean(array).toFixed(decimalPlaces)),
  median: parseFloat(getMean(array).toFixed(decimalPlaces)),
  variance: parseFloat(getSampleVariance(array).toFixed(decimalPlaces)),
  standardDeviation: parseFloat(getStandardDeviation(array).toFixed(decimalPlaces)),
});
