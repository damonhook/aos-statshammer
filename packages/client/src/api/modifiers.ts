import { modifiersStore } from 'store/slices'
import { Dispatch } from '@reduxjs/toolkit'
import { get } from './helpers'
import { ModifiersResponse } from 'types/store/modifiers'

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
