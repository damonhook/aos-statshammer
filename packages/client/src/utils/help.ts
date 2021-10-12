import { ReactourStep } from 'reactour'
import { PrefixedSelectors } from 'types/help'

const HELP_ENABLED = false

export const selectorsWithPrefix = <I extends string, C extends string>(
  prefix: string,
  base: PrefixedSelectors<I, C>
): PrefixedSelectors<I, C> => {
  const { ids, classes } = base
  return {
    ids: Object.keys(ids).reduce(
      (acc, key) => ({ ...acc, [key]: `${prefix}-${ids[key as I]}` }),
      {} as PrefixedSelectors<I, C>['ids']
    ),
    classes: Object.keys(classes).reduce(
      (acc, key) => ({ ...acc, [key]: `${prefix}-${classes[key as C]}` }),
      {} as PrefixedSelectors<I, C>['classes']
    ),
  }
}

interface StepConfig extends Omit<ReactourStep, 'selector'> {
  id?: string
  className?: string
  hidden?: boolean
}
interface IdStepConfig extends StepConfig {
  id: string
}
interface ClassStepConfig extends StepConfig {
  className: string
}

export const buildHelpSteps = (stepsConfig: (IdStepConfig | ClassStepConfig)[]) => {
  if (!HELP_ENABLED) return []
  return stepsConfig
    .filter(({ hidden }) => !hidden)
    .map<ReactourStep>(({ id, className, ...rest }) => {
      if (id) return { selector: `#${id}`, ...rest }
      else return { selector: `.${className}`, ...rest }
    })
}
