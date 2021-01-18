import { ModifierOption } from 'types/modifierDefinition'

export interface InputComponentProps<T extends ModifierOption> {
  option: T
  name: string
  value: string | number | boolean
  onChange: (newValue: string | number | boolean) => void
  error?: string
}
