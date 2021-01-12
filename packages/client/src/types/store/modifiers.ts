import { ModifierDefinition } from '../modifierDefinition'

export interface ModifiersResponse {
  modifiers: ModifierDefinition[]
  targetModifiers: ModifierDefinition[]
}

interface ModifiersStore extends ModifiersResponse {
  pending: boolean
}

export default ModifiersStore
