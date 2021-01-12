import { WeaponProfileParams } from './units'

export type ProfileFormData = WeaponProfileParams

type CharacteristicErrors = {
  [key in keyof Omit<ProfileFormData, 'modifiers'>]?: string
}

type ModifierErrors = {
  modifiers?: { [field: string]: string }
}

export type ProfileFormErrors = Partial<CharacteristicErrors & ModifierErrors>

interface ProfileFormStore {
  data?: ProfileFormData
  errors?: ProfileFormErrors
}

export default ProfileFormStore
