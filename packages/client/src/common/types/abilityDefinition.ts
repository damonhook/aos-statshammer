export interface AbilityDefinition {
  id: string
  name: string
  description: string
  options: { [key: string]: AbilityOption }
}

export type AbilityOption = ChoiceOption | RollOption | NumberOption | BooleanOption

export interface ChoiceOption {
  type: 'choice'
  items: string[]
  default?: string
}

export interface RollOption {
  type: 'roll'
  allowOnes?: boolean
  default?: number
}

export interface NumberOption {
  type: 'number'
  allowDice?: boolean
  default?: number
}

export interface BooleanOption {
  type: 'boolean'
  default?: number
}
