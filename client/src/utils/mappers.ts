import type { IUnit } from 'types/unit';

const applyResultsMapping = (mapping: { [x: string]: any }, data: any[], fixedKey: string | null = 'save') =>
  data.map((result) =>
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

export const getResultsMapping = (mapping: { [x: string]: any }) => (data: any[]) =>
  applyResultsMapping(mapping, data);

export const applyUnitNameMapping = (units: IUnit[]) =>
  units.reduce<{ [uuid: string]: string }>((acc, { uuid, name }) => {
    acc[uuid] = name;
    return acc;
  }, {});
