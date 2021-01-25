import { Dispatch } from '@reduxjs/toolkit'
import { simulationsStore } from 'store/slices'
import { SimulationsRequest, SimulationsResponse } from 'types/store/simulations'
import { Unit } from 'types/store/units'

import { post, unitIdResponseProcessor } from './helpers'

export const getSimulations = ({ units }: { units: Unit[] }) => async (dispatch: Dispatch) => {
  const { simulationsPending, simulationsSucess, simulationsError } = simulationsStore.actions
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
  }
}
