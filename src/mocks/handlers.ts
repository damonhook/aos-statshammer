import { rest } from 'msw'
import abilitiesResponse from './responses/abilities.json'
import averageResponse from './responses/average_comparison.json'

const HOST = import.meta.env.VITE_API_HOST

export const handlers = [
  rest.get(`${HOST}/aos/abilities`, (req, res, ctx) => {
    return res(ctx.json(abilitiesResponse))
  }),
  rest.post(`${HOST}/aos/comparison/average`, (req, res, ctx) => {
    return res(ctx.json(averageResponse))
  }),
]
