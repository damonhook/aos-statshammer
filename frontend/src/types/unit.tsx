export interface Unit {
  id: string
  name: string
  models: ModelGroup[]
}

export interface ModelGroup {
  id: string
  quantity: number,
  weapon: Weapon
}

export interface Weapon {
  attacks: number,
  toHit: number,
  toWound: number,
  rend: number,
  damage: number,
}
