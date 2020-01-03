export enum Characteristics {
  ATTACKS = 'attacks',
  TO_HIT = 'to_hit',
  TO_WOUND = 'to_wound',
  REND = 'rend',
  DAMAGE = 'damage',
  SAVE = 'save',
}

export const getCharacteristic = (val: string): Characteristics => {
  const k = Object.keys(Characteristics).find(key => Characteristics[key] === val);
  if (k) {
    return Characteristics[k];
  }
  return null;
};

export const SAVES = [2, 3, 4, 5, 6, 0];
