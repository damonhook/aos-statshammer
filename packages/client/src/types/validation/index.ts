import { ModifierDefinition } from 'types/modifierDefinition'

export * from './modifierErrors'
export * from './profileErrors'
export * from './unitErrors'

export interface ValidationOptions {
  total?: boolean
  modifierDefinitions?: ModifierDefinition[]
}
