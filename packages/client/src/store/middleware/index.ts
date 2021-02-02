import { Middleware } from '@reduxjs/toolkit'

import profileFormMiddleware from './profileFormMiddleware'
import targetMiddleware from './targetMiddleware'
import validateUnitFormMiddleware from './unitFormMiddleware'

const customMiddleware: Middleware[] = [validateUnitFormMiddleware, profileFormMiddleware, targetMiddleware]

export default customMiddleware
