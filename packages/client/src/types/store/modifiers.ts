import { ModifierDefinition } from '../modifierDefinition'

export interface ModifiersResponse {
  modifiers: ModifierDefinition[]
  targetModifiers: ModifierDefinition[]
}

export interface ModifiersStore extends ModifiersResponse {
  pending: boolean
}

export default ModifiersStore
