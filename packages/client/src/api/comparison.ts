import { comparisonStore } from 'store/slices'
import { Dispatch } from '@reduxjs/toolkit'
import { post } from './helpers'
import { ComparisonResponse } from 'types/store/comparison'

export const getComparison = ({ units }: { units: object }) => async (dispatch: Dispatch) => {
  const { comparisonPending, comparisonSucess, comparisonError } = comparisonStore.actions
  dispatch(comparisonPending())
  try {
    const res = await post<ComparisonResponse>({ path: '/compare', body: units })
    dispatch(comparisonSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(comparisonError())
  }
}
