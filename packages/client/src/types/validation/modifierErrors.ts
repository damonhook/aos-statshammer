export type ModifierListErrors = {
  [id: string]: ModifierError
}

export type ModifierError = ModifierFieldErrors | string | undefined

export type ModifierFieldErrors = {
  [field: string]: string | undefined
}
