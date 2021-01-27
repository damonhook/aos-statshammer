import { Save } from 'common'
import { Unit } from 'models/unit'

import * as Chaos from '../units/chaos'
import * as Death from '../units/death'
import * as Order from '../units/order'

export interface AverageDamageTheory {
  unit: Unit
  results: { save: Save; expected: number }[]
}

export const getAverageDamageTheories = (): AverageDamageTheory[] => {
  return [...getOrderTheories(), ...getDeathTheories(), ...getChaosTheories(), ...getDestructionTheories()]
}

const getOrderTheories = (): AverageDamageTheory[] => {
  return [
    {
      unit: Order.KurnothHunters,
      results: [
        { save: 2, expected: 5.296 },
        { save: 3, expected: 7.222 },
        { save: 4, expected: 9.148 },
        { save: 5, expected: 11.074 },
        { save: 6, expected: 13.0 },
        { save: 7, expected: 13.0 },
      ],
    },
    {
      unit: Order.Gotrek,
      results: [
        { save: 2, expected: 11.778 },
        { save: 3, expected: 14.148 },
        { save: 4, expected: 16.519 },
        { save: 5, expected: 18.889 },
        { save: 6, expected: 18.889 },
        { save: 7, expected: 18.889 },
      ],
    },
  ]
}

const getDeathTheories = (): AverageDamageTheory[] => {
  return [
    {
      unit: Death.ChainraspHorde,
      results: [
        { save: 2, expected: 0.875 },
        { save: 3, expected: 1.75 },
        { save: 4, expected: 2.625 },
        { save: 5, expected: 3.5 },
        { save: 6, expected: 4.375 },
        { save: 7, expected: 5.25 },
      ],
    },
    {
      unit: Death.SpiritHosts,
      results: [
        { save: 2, expected: 3.25 },
        { save: 3, expected: 3.5 },
        { save: 4, expected: 3.75 },
        { save: 5, expected: 4 },
        { save: 6, expected: 4.25 },
        { save: 7, expected: 4.5 },
      ],
    },
    {
      unit: Death.DreadbladeHarrow,
      results: [
        { save: 2, expected: 0.574 },
        { save: 3, expected: 0.889 },
        { save: 4, expected: 1.204 },
        { save: 5, expected: 1.519 },
        { save: 6, expected: 1.833 },
        { save: 7, expected: 1.889 },
      ],
    },
    {
      unit: Death.CairnWraith,
      results: [
        { save: 2, expected: 2.167 },
        { save: 3, expected: 2.5 },
        { save: 4, expected: 2.833 },
        { save: 5, expected: 3.167 },
        { save: 6, expected: 3.5 },
        { save: 7, expected: 3.5 },
      ],
    },
    {
      unit: Death.MortekGuard,
      results: [
        { save: 2, expected: 2.935 },
        { save: 3, expected: 4.403 },
        { save: 4, expected: 5.87 },
        { save: 5, expected: 7.338 },
        { save: 6, expected: 8.806 },
        { save: 7, expected: 8.806 },
      ],
    },
    {
      unit: Death.NecropolisStalkers,
      results: [
        { save: 2, expected: 2.481 },
        { save: 3, expected: 3.556 },
        { save: 4, expected: 4.63 },
        { save: 5, expected: 5.704 },
        { save: 6, expected: 6.444 },
        { save: 7, expected: 6.444 },
      ],
    },
    {
      unit: Death.NecropolisStalkersPrecision,
      results: [
        { save: 2, expected: 6.444 },
        { save: 3, expected: 8.426 },
        { save: 4, expected: 10.407 },
        { save: 5, expected: 11.889 },
        { save: 6, expected: 11.889 },
        { save: 7, expected: 11.889 },
      ],
    },
  ]
}

const getChaosTheories = (): AverageDamageTheory[] => {
  return [
    {
      unit: Chaos.PlagueMonksPre2019,
      results: [
        { save: 2, expected: 4.444 },
        { save: 3, expected: 7.778 },
        { save: 4, expected: 11.111 },
        { save: 5, expected: 14.444 },
        { save: 6, expected: 17.778 },
        { save: 7, expected: 20.0 },
      ],
    },
  ]
}

const getDestructionTheories = (): AverageDamageTheory[] => {
  return []
}
