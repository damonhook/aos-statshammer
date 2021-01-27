export enum Characteristic {
  ATTACKS = 'attacks',
  TO_HIT = 'to_hit',
  TO_WOUND = 'to_wound',
  REND = 'rend',
  DAMAGE = 'damage',
  SAVE = 'save',
}

export const Saves = [2, 3, 4, 5, 6, 7] as const
export type Save = typeof Saves[number]

export type ProcessorSaveResults = { [s in Save]: number }
