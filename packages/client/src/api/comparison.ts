import { Dispatch } from '@reduxjs/toolkit'
import { comparisonStore, notificationsStore } from 'store/slices'
import { ComparisonRequest, ComparisonResponse } from 'types/store/comparison'
import { Target } from 'types/store/target'
import { Unit } from 'types/store/units'

import { post, unitIdResponseProcessor } from './helpers'

type GetComparisonProps = { units: Unit[]; target?: Target }
export const getComparison = ({ units, target }: GetComparisonProps) => async (dispatch: Dispatch) => {
  const { comparisonPending, comparisonSucess, comparisonError } = comparisonStore.actions
  const { addNotification } = notificationsStore.actions
  dispatch(comparisonPending())
  try {
    if (!units || !units.length) dispatch(comparisonSucess({ results: [] }))
    const res = await post<ComparisonRequest, ComparisonResponse>({
      path: '/compare',
      body: { units, target },
      responseProcessor: unitIdResponseProcessor,
    })
    dispatch(comparisonSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(comparisonError())
    dispatch(addNotification({ message: 'Failed to fetch comparison data', variant: 'error' }))
  }
}
