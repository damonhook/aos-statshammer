import 'core-js/stable'
import 'regenerator-runtime/runtime'

import express from 'express'
import { initialize } from 'express-openapi'
import { readFileSync } from 'fs'
import path from 'path'
import AosController from './controller'
import bodyParser from 'body-parser'
import type { CompareRequest, ModifiersRequest } from 'models/schema'
import { withCaseConversion } from 'utils/requestUtils'
import { UnitParams } from 'models/unit'
import { HumpsProcessorParameter } from 'humps'

// @ts-ignore
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const controller = new AosController()

const unitIdResponseProcessor = <T extends { units: UnitParams[] }>(request: T) => {
  const unitIds = request.units.map(u => u.id)
  return (key: string, convert: HumpsProcessorParameter) => {
    return unitIds.includes(key) ? key : convert(key)
  }
}

initialize({
  app,
  apiDoc: readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf8'),
  docsPath: '/api/spec.yaml',
  operations: {
    getStatus: function (req, res) {
      res.send({ status: 'ok', version: '1.0.0' })
    },
    getModifiers: function (req, res) {
      res.send(withCaseConversion(req.body, (data: ModifiersRequest) => controller.getModifiers(data)))
    },
    getCompare: function (req, res) {
      res.send(
        withCaseConversion(req.body, (data: CompareRequest) => controller.compareUnits(data), {
          responseProcessor: unitIdResponseProcessor,
        })
      )
    },
  },
})

app.get('/api/docs', function (req, res) {
  res.sendFile(path.resolve(__dirname, './static/explorer.html'))
})

app.listen(5000)
