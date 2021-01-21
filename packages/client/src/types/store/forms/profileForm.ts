import { ProfileErrors } from 'types/validation'

import { WeaponProfileParams } from '../units'

export type ProfileFormData = WeaponProfileParams

interface ProfileFormStore {
  data?: ProfileFormData
  errors?: ProfileErrors
}

export default ProfileFormStore
