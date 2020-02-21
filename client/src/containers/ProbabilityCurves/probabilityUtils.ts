import { ISimulationResult } from 'types/simulations';

export const REFERENCE_LINE_OPTIONS = {
  NONE: 'None',
  MEAN: 'Mean',
  MAX: 'Max',
};

export const getMaxDamage = (data: ISimulationResult[]) =>
  Math.max(...data.map(({ metrics }) => Math.max(...Object.values(metrics.max).map(d => Number(d)))));

export const getMaxProbability = (data: ISimulationResult[]) =>
  Math.max(
    ...data.map(({ discrete }) =>
      Math.max(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ...discrete.map(({ damage, ...other }) => Math.max(...Object.values(other).map(p => Number(p)))),
      ),
    ),
  );

export const getTicks = (maxProbability: number) =>
  [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10);
