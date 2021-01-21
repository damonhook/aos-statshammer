import ComparisonStore from './comparison'
import ConfigStore from './config'
import FormsStore from './forms'
import ModifiersStore from './modifiers'
import TargetStore from './target'
import UnitsStore from './units'

interface Store {
  modifiers: ModifiersStore
  units: UnitsStore
  target: TargetStore
  comparison: ComparisonStore
  config: ConfigStore
  forms: FormsStore
}

export default Store
