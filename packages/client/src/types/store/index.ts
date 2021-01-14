import ModifiersStore from './modifiers'
import UnitsStore from './units'
import ComparisonStore from './comparison'
import ProfileFormStore from './profileForm'
import UnitFormStore from './unitForm'
import TargetStore from './target'

export interface FormsStore {
  unit: UnitFormStore
  weaponProfile: ProfileFormStore
}

interface Store {
  modifiers: ModifiersStore
  units: UnitsStore
  target: TargetStore
  comparison: ComparisonStore
  forms: FormsStore
}

export default Store
