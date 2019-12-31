export const getSeriesNames = (
  (numSeries) => [...Array(numSeries)].map((_, index) => `Series ${index}`)
);

export const generateData = (seriesNames, numXValues) => (
  [...Array(numXValues)].map((_, index) => (
    seriesNames.reduce((acc, _, index) => ({
      ...acc,
      [`Series ${index}`]: 1 + Math.floor(Math.random() * 100),
    }), { name: index })
  ))
);
