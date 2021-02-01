import { HomeTab } from 'types/store/ui'
import { buildHelpSteps, selectorsWithPrefix } from 'utils/help'

export const helpSelectors = selectorsWithPrefix('help-units', {
  ids: {
    addUnit: 'add-unit',
    addTargetModifiers: 'add-target-modifiers',
  },
  classes: {},
})

interface GetStepsProps {
  setHomeTab: (tab: HomeTab) => void
}
const getHelpSteps = ({ setHomeTab }: GetStepsProps) =>
  buildHelpSteps([
    {
      id: helpSelectors.ids.addUnit,
      content: 'You can add units',
      action: () => setHomeTab('units'),
    },
    {
      id: helpSelectors.ids.addTargetModifiers,
      content: 'You can add target modifiers',
      action: () => setHomeTab('target'),
    },
  ])

export default getHelpSteps
