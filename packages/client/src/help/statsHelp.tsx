import { buildHelpSteps, selectorsWithPrefix } from 'utils/help'

export const helpSelectors = selectorsWithPrefix('help-stats', {
  ids: {
    targetSummary: 'target-summary',
    table: 'table',
    graphs: 'graphs',
  },
  classes: {},
})

interface GetStepsProps {
  numTargetModifiers: number
}
const getHelpSteps = ({ numTargetModifiers }: GetStepsProps) =>
  buildHelpSteps([
    {
      id: helpSelectors.ids.targetSummary,
      content: 'This shows a summary of the applied target modifiers (e.g: Rerolling saves)',
      hidden: numTargetModifiers <= 0,
      stepInteraction: false,
    },
    {
      id: helpSelectors.ids.table,
      content: `This shows a table containing the average damage that each unit is expected to do
      against each save value`,
      stepInteraction: false,
    },
    {
      id: helpSelectors.ids.graphs,
      content: `This shows a graph containing the average damage that each unit is expected to do
      against each save value`,
      stepInteraction: false,
    },
  ])

export default getHelpSteps
