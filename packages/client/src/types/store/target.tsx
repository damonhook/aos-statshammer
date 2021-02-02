import { TargetErrors } from 'types/validation/targetErrors'

import { Modifier } from '../modifierInstance'

export interface Target {
  modifiers: Modifier[]
}

interface TargetStore extends Target {
  errors?: TargetErrors
}

export default TargetStore
