import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Unit, UnitData } from 'common/types/unit'
import { nanoid } from 'nanoid'

export interface UnitsState {
  items: Unit[]
}

const initialState: UnitsState = {
  items: [],
}

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    /**
     * Create a new unit based on the given data
     */
    createUnit(state, action: PayloadAction<{ data: UnitData }>) {
      const { data } = action.payload
      state.items.push({
        ...data,
        id: nanoid(),
        weapons: data.weapons.map(weapon => ({
          ...weapon,
          id: nanoid(),
        })),
      })
    },
    /**
     * Edit a specific unit usiung its `id` and the new unit `data`
     */
    editUnit(state, action: PayloadAction<{ id: string; data: UnitData }>) {
      const { id, data } = action.payload
      const index = state.items.findIndex(u => u.id === id)
      if (index !== -1) {
        state.items[index] = {
          ...data,
          weapons: data.weapons.map(weapon => ({
            ...weapon,
            id: weapon.id ?? nanoid(),
          })),
          id,
        }
      }
    },
  },
})

export const { createUnit, editUnit } = unitsSlice.actions

export default unitsSlice.reducer
