import { Dispatch } from '@reduxjs/toolkit'
import { modifiersStore } from 'store/slices'
import { ModifiersResponse } from 'types/store/modifiers'

import { get } from './helpers'

export const getModifiers = () => async (dispatch: Dispatch) => {
  const { modifiersPending, modifiersSucess, modifiersError } = modifiersStore.actions
  dispatch(modifiersPending())
  try {
    const res = await get<ModifiersResponse>({ path: '/modifiers' })
    dispatch(modifiersSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(modifiersError())
  }
}
