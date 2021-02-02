import { Dispatch } from '@reduxjs/toolkit'
import { notificationsStore, simulationsStore } from 'store/slices'
import { SimulationsRequest, SimulationsResponse } from 'types/store/simulations'
import { Target } from 'types/store/target'
import { Unit } from 'types/store/units'

import { post, unitIdResponseProcessor } from './helpers'

type GetSimulationsProps = { units: Unit[]; limit: number; target?: Target }
export const getSimulations = ({ units, limit, target }: GetSimulationsProps) => async (
  dispatch: Dispatch
) => {
  const { simulationsPending, simulationsSucess, simulationsError } = simulationsStore.actions
  const { addNotification } = notificationsStore.actions
  dispatch(simulationsPending())
  try {
    if (!units || !units.length) dispatch(simulationsSucess({ results: [] }))
    const res = await post<SimulationsRequest, SimulationsResponse>({
      path: '/simulate',
      body: { units, target },
      query: { limit },
      responseProcessor: unitIdResponseProcessor,
    })
    dispatch(simulationsSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(simulationsError())
    dispatch(addNotification({ message: 'Failed to fetch simulations data', variant: 'error' }))
  }
}
