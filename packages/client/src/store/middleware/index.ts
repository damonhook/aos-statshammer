import { Middleware } from '@reduxjs/toolkit'
import validateUnitFormMiddleware from './validateUnitFormMiddleware'
import profileFormMiddleware from './profileFormMiddleware'

const customMiddleware: Middleware[] = [validateUnitFormMiddleware, profileFormMiddleware]

export default customMiddleware
