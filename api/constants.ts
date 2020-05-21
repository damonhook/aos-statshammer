export enum Characteristic {
  ATTACKS = 'attacks',
  TO_HIT = 'to_hit',
  TO_WOUND = 'to_wound',
  REND = 'rend',
  DAMAGE = 'damage',
  SAVE = 'save',
}

export const getCharacteristic = (val: string): Characteristic | null => {
  const k = Object.keys(Characteristic).find((key) => Characteristic[key] === val);
  if (k) {
    return Characteristic[k];
  }
  return null;
};

export const getCharacteristicsAfter = (characteristic: Characteristic): Characteristic[] => {
  const values = Object.keys(Characteristic).map((key) => Characteristic[key]);
  const index = values.indexOf(characteristic);
  return values.slice(index + 1);
};

export const SAVES = [2, 3, 4, 5, 6, 0];
