// import { createContext } from 'react'
import { ReactourStep } from 'reactour'

export interface Selectors<I extends string, C extends string> {
  ids: Record<I, string>
  classes: Record<C, string>
}

export const selectorsWithPrefix = <I extends string, C extends string>(
  prefix: string,
  base: Selectors<I, C>
): Selectors<I, C> => {
  const { ids, classes } = base
  return {
    ids: Object.keys(ids).reduce(
      (acc, key) => ({ ...acc, [key]: `${prefix}-${ids[key as I]}` }),
      {} as Selectors<I, C>['ids']
    ),
    classes: Object.keys(classes).reduce(
      (acc, key) => ({ ...acc, [key]: `${prefix}-${classes[key as C]}` }),
      {} as Selectors<I, C>['classes']
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

export const buildSteps = (stepsConfig: (IdStepConfig | ClassStepConfig)[]) => {
  return stepsConfig
    .filter(({ hidden }) => !hidden)
    .map<ReactourStep>(({ id, className, ...rest }) => {
      if (id) return { selector: `#${id}`, ...rest }
      else return { selector: `.${className}`, ...rest }
    })
}

// type GetStepsFunction = ((data: any) => ReactourStep[]) | (() => ReactourStep[])

// interface TourContextState<I extends string, C extends string, S extends GetStepsFunction> {
//   running: boolean
//   selectors: Selectors<I, C>
//   getSteps: S
// }

// export const createTourContext = <I extends string, C extends string, S extends GetStepsFunction>(
//   selectors: Selectors<I, C>,
//   getSteps: S
// ) => {
//   return createContext<TourContextState<I, C, S>>({
//     running: false,
//     selectors,
//     getSteps,
//   })
// }
