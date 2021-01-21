import { unitFormStore } from 'store/slices/forms'
import { validateUnit } from 'utils/validators/unit'

import { createMiddleware } from './utils'

const actions = unitFormStore.actions

export default createMiddleware((store, action) => {
  const { key, value } = action.payload
  store.dispatch(actions.setErrors({ errors: validateUnit({ [key]: value }) }))
}, unitFormStore.actions.editData)
