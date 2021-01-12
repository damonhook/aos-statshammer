import humps from 'humps'

const API_URL = '/api'

interface GetParams {
  path: string
  query?: { [name: string]: any }
  extra?: Omit<RequestInit, 'method'>
}

interface PostParams extends GetParams {
  body: object
}

export const get = async <T extends object>({ path, query, extra }: GetParams): Promise<T> => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'GET',
    ...extra,
  })
  return parseResponse<T>(request)
}

export const post = async <T extends object>({ path, body, query, extra }: PostParams): Promise<T> => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'POST',
    body: JSON.stringify(humps.decamelizeKeys(body)),
    ...extra,
  })
  return parseResponse<T>(request)
}

const buildRequestUrl = (path: string, query?: { [name: string]: any }): string => {
  const cleanPath = path.replace(/^\//, '')
  const url = `${API_URL}/${cleanPath}`
  const params = new URLSearchParams(query).toString()
  return params ? `${url}?${params}` : url
}

const parseResponse = async <T extends object>(response: Response, camelize: boolean = true): Promise<T> => {
  if (response.ok) {
    const json = await response.json()
    return camelize ? humps.camelizeKeys(json) : json
  }
  let err = 'An unexpected error occured'
  if (response.headers.get('content-type')?.includes('application/json')) {
    const json = await response.json()
    err = json.message || err
  }
  throw new Error(err)
}
