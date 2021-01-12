import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProfileFormStore, { ProfileFormData } from 'types/store/profileForm'

const INITIAL_STATE: ProfileFormStore = {
  data: undefined,
  errors: undefined,
}

export default createSlice({
  name: 'profileForm',
  initialState: INITIAL_STATE,
  reducers: {
    initForm(state: ProfileFormStore, action: PayloadAction<{ weaponProfile?: ProfileFormData }>) {
      const { weaponProfile } = action.payload
      state.data = weaponProfile ? { ...weaponProfile } : undefined
      state.errors = undefined
    },
    editData<T extends keyof ProfileFormData>(
      state: ProfileFormStore,
      action: PayloadAction<{ key: T; value: ProfileFormData[T] }>
    ) {
      const { key, value } = action.payload
      if (state.data) state.data[key] = value
    },
    clearForm(state: ProfileFormStore) {
      state.data = undefined
      state.errors = undefined
    },
  },
})
