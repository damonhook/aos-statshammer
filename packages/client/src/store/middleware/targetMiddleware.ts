import { targetStore } from 'store/slices'
import { validateModifiers } from 'utils/validators/modifiers'

import { createMiddleware } from './utils'

const actions = targetStore.actions

export default createMiddleware((store, action) => {
  switch (action.type) {
    case actions.addModifiers.type:
    case actions.addModifier.type:
    case actions.deleteModifier.type:
    case actions.setModifierDisabled.type:
    case actions.editModifierOption.type: {
      const state = store.getState()
      const data = state.target.modifiers
      const definitions = state.modifiers.targetModifiers
      store.dispatch(
        actions.setErrors({
          errors: {
            modifiers: validateModifiers(data ?? [], { modifierDefinitions: definitions }),
          },
        })
      )
      break
    }
  }
})
