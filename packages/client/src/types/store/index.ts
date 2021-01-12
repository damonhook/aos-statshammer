import ModifiersStore from './modifiers'
import UnitsStore from './units'
import ComparisonStore from './comparison'
import ProfileFormStore from './profileForm'

interface Store {
  modifiers: ModifiersStore
  units: UnitsStore
  comparison: ComparisonStore
  profileForm: ProfileFormStore
}

export default Store
