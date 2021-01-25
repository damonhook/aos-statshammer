import ComparisonStore from './comparison'
import ConfigStore from './config'
import FormsStore from './forms'
import ModifiersStore from './modifiers'
import NotificationsStore from './notifications'
import SimulationsStore from './simulations'
import TargetStore from './target'
import UnitsStore from './units'

interface Store {
  modifiers: ModifiersStore
  units: UnitsStore
  target: TargetStore
  comparison: ComparisonStore
  simulations: SimulationsStore
  config: ConfigStore
  notifications: NotificationsStore
  forms: FormsStore
}

export default Store
