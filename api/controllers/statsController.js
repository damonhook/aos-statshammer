/* eslint-disable import/prefer-default-export */
import Unit from './../models/unit';
import Target from './../models/target';
import { SAVES } from './../constants';


export const compareUnits = ({ units }) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const results = SAVES.map((save) => {
    const target = new Target(save);
    return unitList.reduce((acc, unit) => {
      acc[unit.name] = parseFloat(unit.averageDamage(target).toFixed(2));
      return acc;
    }, { save: save ? save.toString() : 'None' });
  });

  return {
    results,
    units: unitList,
  };
};
