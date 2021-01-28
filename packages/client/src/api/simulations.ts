import { Dispatch } from '@reduxjs/toolkit'
import { notificationsStore, simulationsStore } from 'store/slices'
import { SimulationsRequest, SimulationsResponse } from 'types/store/simulations'
import { Unit } from 'types/store/units'

import { post, unitIdResponseProcessor } from './helpers'

export const getSimulations = ({ units }: { units: Unit[] }) => async (dispatch: Dispatch) => {
  const { simulationsPending, simulationsSucess, simulationsError } = simulationsStore.actions
  const { addNotification } = notificationsStore.actions
  dispatch(simulationsPending())
  try {
    if (!units || !units.length) dispatch(simulationsSucess({ results: [] }))
    const res = await post<SimulationsRequest, SimulationsResponse>({
      path: '/simulate',
      body: { units },
      responseProcessor: unitIdResponseProcessor,
    })
    dispatch(simulationsSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(simulationsError())
    dispatch(addNotification({ message: 'Failed to fetch simulations data', variant: 'error' }))
  }
}
