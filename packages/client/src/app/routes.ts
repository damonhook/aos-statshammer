import type { ExtractRouteParams } from 'react-router'
import { generatePath, useParams } from 'react-router-dom'

export type AppRoute<S extends string = string> = {
  readonly name: string
  readonly rule: S
  readonly make: (params?: ExtractRouteParams<S>) => string
}

function createRoute<S extends string>(name: string, rule: S, partial: boolean = false): AppRoute<S> {
  return {
    name,
    rule,
    make(params: ExtractRouteParams<S> = {}) {
      return generatePath(this.rule, params)
    },
  }
}

export type PartialAppRoute<S extends string = string> = {
  readonly name: string
  readonly rule: S
  readonly buildRule: (base: string) => string
  readonly make: (base: string, params?: ExtractRouteParams<S>) => string
}

function createPartialRoute<S extends string>(name: string, rule: S): PartialAppRoute<S> {
  return {
    name,
    rule,
    buildRule(base: string) {
      return `${base}/${this.rule}`
    },
    make(base: string, params: ExtractRouteParams<S> = {}) {
      return `${base}/${generatePath(this.rule, params)}`
    },
  }
}

const routes = {
  ROOT: createRoute('Home', '/'),
  // Units
  UNITS: createRoute('Units', '/units'),
  CREATE_UNIT: createRoute('Create Unit', '/units/create'),
  EDIT_UNIT: createRoute('Edit Unit', '/units/:unitId'),
  CREATE_WEAPON: createPartialRoute('Create Weapon', 'weapons/create'),
  EDIT_WEAPON: createPartialRoute('Edit Weapon', 'weapons/:weaponId'),
  // Comparison
  COMPARISON: createRoute('Comparison', '/comparison'),
} as const

export const useRouteParams = <S extends string>(r: AppRoute<S> | PartialAppRoute<S>) =>
  useParams<{ [k in keyof ExtractRouteParams<S>]: string }>()

export default routes
