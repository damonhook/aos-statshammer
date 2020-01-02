export const REFERENCE_LINE_OPTIONS = {
  NONE: 'None',
  MEAN: 'Mean',
  MEDIAN: 'Median',
  MAX: 'Max',
};

export const getMaxDamage = (probabilities: any[]) =>
  Math.max(
    ...probabilities.map(({ metrics }) =>
      Math.max(...Object.values(metrics.max).map(d => Number(d))),
    ),
  );

export const getMaxProbability = (probabilities: any[]) =>
  Math.max(
    ...probabilities.map(({ buckets }) =>
      Math.max(
        ...buckets.map(({ damage, ...other }) =>
          Math.max(...Object.values(other).map(p => Number(p))),
        ),
      ),
    ),
  );

export const getTicks = (maxProbability: number) =>
  [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10);
