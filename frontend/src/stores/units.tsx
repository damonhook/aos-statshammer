import { ModelGroup, Unit } from "@/types/unit"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { nanoid } from "nanoid"

export interface UnitsState {
  units: Unit[]
}

export interface UnitsActions {
  clearUnits: () => void
  createUnit: (unit: Omit<Unit, "id">) => void
  editUnitName: (index: number, name: string) => void
  removeUnit: (index: number) => void
  addModelGroup: (index: number, group: Omit<ModelGroup, "id">) => void
  removeModelGroup: (index: number) => void
}

const initialState: UnitsState = {
  units: [],
}

type UnitsStore = UnitsState & UnitsActions

export const useUnitsStore = create<UnitsStore>()(
  immer((set) => ({
    ...initialState,
    clearUnits: () => set(initialState),

    createUnit: (unit) =>
      set((state) => {
        state.units.push({ id: nanoid(), ...unit })
      }),

    editUnitName: (index, name) =>
      set((state) => {
        const unit = state.units[index]
        if (unit != null) unit.name = name
      }),

    removeUnit: (index) =>
      set((state) => {
        state.units.splice(index, 1)
      }),

    addModelGroup: (index, group) =>
      set((state) => {
        const unit = state.units[index]
        if (unit != null) unit.models.push({ id: nanoid(), ...group })
      }),

    removeModelGroup: (index) =>
      set((state) => {
        const unit = state.units[index]
        if (unit != null) unit.models.splice(index, 1)
      }),
  })),
)
