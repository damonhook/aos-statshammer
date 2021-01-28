import { unitFormStore } from 'store/slices/forms'
import { validateUnit, validateUnitProfiles } from 'utils/validators/unit'

import { createMiddleware } from './utils'

const actions = unitFormStore.actions

export default createMiddleware((store, action) => {
  switch (action.type) {
    case actions.initForm.type: {
      const state = store.getState()
      const data = state.forms.weaponProfile.data
      const definitions = state.modifiers.modifiers
      const errors = data ? validateUnit(data, { modifierDefinitions: definitions }) : undefined
      store.dispatch(actions.setErrors({ errors }))
      break
    }
    case actions.editData.type: {
      const { key, value } = action.payload
      store.dispatch(actions.setErrors({ errors: validateUnit({ [key]: value }) }))
      break
    }
    case actions.addWeaponProfile.type:
    case actions.addWeaponProfiles.type:
    case actions.editWeaponProfile.type:
    case actions.deleteWeaponProfile.type: {
      const state = store.getState()
      const formData = state.forms.unit.data
      const definitions = state.modifiers.modifiers
      if (formData) {
        store.dispatch(
          actions.setErrors({
            errors: validateUnit(formData, { modifierDefinitions: definitions }),
          })
        )
      }
      break
    }
  }
})
