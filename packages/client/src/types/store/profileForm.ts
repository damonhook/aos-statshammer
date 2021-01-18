import { ModifierErrors } from 'types/modifierInstance'
import { WeaponProfileParams } from './units'

export type ProfileFormData = WeaponProfileParams

export type ProfileFormCharacteristicErrors = {
  [key in keyof Omit<ProfileFormData, 'modifiers' | 'disabled'>]?: string
}

export type ProfileFormErrors = Partial<ProfileFormCharacteristicErrors & { modifiers: ModifierErrors }>

interface ProfileFormStore {
  data?: ProfileFormData
  errors?: ProfileFormErrors
}

export default ProfileFormStore
