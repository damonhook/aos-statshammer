export interface Modifier {
  id: string
  type: string
  options: { [name: string]: string | number | boolean }
  disabled?: boolean
}

export type ModifierFieldErrors = {
  [field: string]: string | undefined
}
export type ModifierErrors = {
  [id: string]: ModifierFieldErrors | undefined
}
