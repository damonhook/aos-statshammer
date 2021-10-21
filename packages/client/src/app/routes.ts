import type { ExtractRouteParams } from 'react-router'
import { generatePath, useParams } from 'react-router-dom'

export type AppRoute<S extends string = string> = {
  readonly name: string
  readonly rule: S
  readonly partial: boolean
  readonly make: (params?: ExtractRouteParams<S>) => string
}

function createRoute<S extends string>(name: string, rule: S, partial: boolean = false): AppRoute<S> {
  return {
    name,
    rule,
    partial,
    make(params: ExtractRouteParams<S> = {}) {
      return generatePath(this.rule, params)
    },
  }
}

const routes = {
  ROOT: createRoute('Home', '/'),
  UNITS: createRoute('Units', '/units'),
  CREATE_UNIT: createRoute('Create Unit', '/units/create'),
  EDIT_UNIT: createRoute('Edit Unit', '/units/:unitId'),
  CREATE_WEAPON: createRoute('Create Weapon', 'weapons/create', true),
  EDIT_WEAPON: createRoute('Edit Weapon', 'weapons/:weaponId', true),
} as const

export const useRouteParams = <S extends string>(r: AppRoute<S>) =>
  useParams<{ [k in keyof ExtractRouteParams<S>]: string }>()

export default routes
