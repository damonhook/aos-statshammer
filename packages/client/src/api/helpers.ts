import humps, { HumpsProcessor, HumpsProcessorParameter } from 'humps'
import { Unit } from 'types/store/units'

const API_URL = '/api'

interface GetParams {
  path: string
  query?: { [name: string]: any }
  extra?: Omit<RequestInit, 'method'>
}

interface PostParams<T extends Record<string, unknown>> extends GetParams {
  body: T
  responseProcessor?: (request: T) => HumpsProcessor
}

// === Methods ===

export const get = async <T extends Record<any, any>>({ path, query, extra }: GetParams): Promise<T> => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'GET',
    ...extra,
  })
  return parseResponse<T>(request)
}

export const post = async <R extends Record<any, any>, T extends Record<any, any>>({
  path,
  body,
  query,
  responseProcessor,
  extra,
}: PostParams<R>): Promise<T> => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'POST',
    body: JSON.stringify(humps.decamelizeKeys(body)),
    headers: {
      'Content-Type': 'application/json',
    },
    ...extra,
  })
  const processor = responseProcessor ? responseProcessor(body) : undefined
  return parseResponse<T>(request, processor)
}

// === Processors ===

export const unitIdResponseProcessor = <T extends { units: Unit[] }>(request: T) => {
  const unitIds = request.units.map(u => u.id)
  return (key: string, convert: HumpsProcessorParameter) => {
    return unitIds.includes(key) ? key : convert(key)
  }
}

// === Parsing ===

const buildRequestUrl = (path: string, query?: { [name: string]: any }): string => {
  const cleanPath = path.replace(/^\//, '')
  const url = `${API_URL}/${cleanPath}`
  const params = new URLSearchParams(query).toString()
  return params ? `${url}?${params}` : url
}

const parseResponse = async <T extends Record<string, unknown>>(
  response: Response,
  processor?: HumpsProcessor
): Promise<T> => {
  if (response.ok) {
    const json: Record<string, unknown> = await response.json()
    return humps.camelizeKeys(json, processor) as T
  }
  let err = 'An unexpected error occured'
  if (response.headers.get('content-type')?.includes('application/json')) {
    const json = await response.json()
    err = json.message || err
  }
  throw new Error(err)
}
