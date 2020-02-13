import { IProbability } from 'types/simulations';

export const REFERENCE_LINE_OPTIONS = {
  NONE: 'None',
  MEAN: 'Mean',
  MAX: 'Max',
};

export const getMaxDamage = (probabilities: IProbability[]) =>
  Math.max(
    ...probabilities.map(({ metrics }) => Math.max(...Object.values(metrics.max).map(d => Number(d)))),
  );

export const getMaxProbability = (probabilities: IProbability[]) =>
  Math.max(
    ...probabilities.map(({ buckets }) =>
      Math.max(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ...buckets.map(({ damage, ...other }) => Math.max(...Object.values(other).map(p => Number(p)))),
      ),
    ),
  );

export const getTicks = (maxProbability: number) =>
  [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10);
