import type { WeaponProfileParams } from 'types/store/units'

import type { ModifierListErrors } from './modifierErrors'

export type ProfileCharacteristicErrors = {
  [key in keyof Omit<WeaponProfileParams, 'modifiers' | 'disabled'>]?: string
}

export type ProfileErrors = Partial<
  ProfileCharacteristicErrors & {
    modifiers: ModifierListErrors
  }
>
