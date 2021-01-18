import { unitFormStore } from 'store/slices'
import { createMiddleware } from './utils'
import { validateUnit } from 'utils/validators/unit'

const actions = unitFormStore.actions

export default createMiddleware((store, action) => {
  const { key, value } = action.payload
  store.dispatch(actions.setErrors({ errors: validateUnit({ [key]: value }) }))
}, unitFormStore.actions.editData)
