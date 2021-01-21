import { ProfileErrors } from './profileErrors'

export type UnitProfileErrors = { [index: number]: ProfileErrors }

export interface UnitErrors {
  name?: string
  weaponProfiles?: UnitProfileErrors | string
}
