import { Middleware } from '@reduxjs/toolkit'

import profileFormMiddleware from './profileFormMiddleware'
import validateUnitFormMiddleware from './unitFormMiddleware'

const customMiddleware: Middleware[] = [validateUnitFormMiddleware, profileFormMiddleware]

export default customMiddleware
