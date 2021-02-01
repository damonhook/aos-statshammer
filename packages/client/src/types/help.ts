import type { ReactourStep } from 'reactour'

export interface PrefixedSelectors<I extends string, C extends string> {
  ids: Record<I, string>
  classes: Record<C, string>
}

export type GetHelpSteps = (() => ReactourStep[]) | ((d: any) => ReactourStep[])
