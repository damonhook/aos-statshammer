import { profileFormStore } from 'store/slices/forms'
import { validateModifiers } from 'utils/validators/modifiers'
import { validateCharacteristics, validateProfile } from 'utils/validators/weaponProfile'

import { createMiddleware } from './utils'

const actions = profileFormStore.actions

export default createMiddleware((store, action) => {
  switch (action.type) {
    case actions.initForm.type: {
      const state = store.getState()
      const data = state.forms.weaponProfile.data
      const definitions = state.modifiers.modifiers
      const errors = data ? validateProfile(data, { modifierDefinitions: definitions }) : undefined
      store.dispatch(actions.setErrors({ errors }))
      break
    }
    case actions.editData.type: {
      const { key, value } = action.payload
      store.dispatch(actions.setErrors({ errors: validateCharacteristics({ [key]: value }) }))
      break
    }
    case actions.addModifiers.type:
    case actions.addModifier.type:
    case actions.deleteModifier.type:
    case actions.setModifierDisabled.type:
    case actions.editModifierOption.type: {
      const state = store.getState()
      const formData = state.forms.weaponProfile.data
      const definitions = state.modifiers.modifiers
      store.dispatch(
        actions.setErrors({
          errors: {
            modifiers: validateModifiers(formData?.modifiers ?? [], { modifierDefinitions: definitions }),
          },
        })
      )
      break
    }
  }
})
