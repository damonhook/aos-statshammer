import { IUnit } from 'types/unit';

export const applyResultsMapping = (
  mapping: { [x: string]: any },
  data: any[],
  fixedKey: string | null = 'save',
) =>
  data.map(result =>
    Object.keys(result).reduce(
      (acc, key) => {
        if (key == null || key === fixedKey) return acc;
        const name = mapping[key];
        if (name) acc[name] = result[key];
        return acc;
      },
      fixedKey ? { [fixedKey]: result[fixedKey] } : {},
    ),
  );

export const applyProbabilitiesMapping = (mapping: { [x: string]: any }, data: any[]) =>
  data.map(({ save, buckets, cumulative, metrics }) => ({
    save,
    buckets: applyResultsMapping(mapping, buckets, 'damage'),
    cumulative: applyResultsMapping(mapping, cumulative, 'damage'),
    metrics: Object.keys(metrics).reduce(
      (acc, metric) => ({
        ...acc,
        [metric]: applyResultsMapping(mapping, [metrics[metric]], null)[0],
      }),
      {},
    ),
  }));

export const getResultsMapping = (mapping: { [x: string]: any }) => (data: any[]) =>
  applyResultsMapping(mapping, data);

export const getProbabilitiesMapping = (mapping: { [x: string]: any }) => (data: any[]) =>
  applyProbabilitiesMapping(mapping, data);

export const applyUnitNameMapping = (units: IUnit[]) =>
  units.reduce<{ [uuid: string]: string }>((acc, { uuid, name }) => {
    acc[uuid] = name;
    return acc;
  }, {});
