/* eslint-disable import/prefer-default-export */

export const generatePayload = (theme, numSeries) => [...Array(numSeries)].map((_, index) => ({
  name: `Series ${index}`,
  value: 1 + Math.floor(Math.random() * 100),
  color: theme.palette.graphs.series[index],
}));
