const API_URL = '/api'

export const get = async <T>(
  path: string,
  query?: { [name: string]: any },
  extra?: Omit<RequestInit, 'method'>
): Promise<T> => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'GET',
    ...extra,
  })
  return parseResponse<T>(request)
}

export const post = async (
  path: string,
  query?: { [name: string]: any },
  body?: BodyInit,
  extra?: Omit<RequestInit, 'method' | 'body'>
) => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'POST',
    body,
    ...extra,
  })
  return parseResponse(request)
}

export const put = async (
  path: string,
  query?: { [name: string]: any },
  body?: BodyInit,
  extra?: Omit<RequestInit, 'method' | 'body'>
) => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'PUT',
    body,
    ...extra,
  })
  return parseResponse(request)
}

export const del = async (
  path: string,
  query?: { [name: string]: any },
  extra?: Omit<RequestInit, 'method'>
) => {
  const request = await fetch(buildRequestUrl(path, query), {
    method: 'DELETE',
    ...extra,
  })
  return parseResponse(request)
}

const buildRequestUrl = (path: string, query?: { [name: string]: any }) => {
  const cleanPath = path.replace(/^\//, '')
  const url = new URL(`${API_URL}/${cleanPath}`)
  url.search = new URLSearchParams(query).toString()
  return url.toString()
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) return response.json()
  if (response.headers.get('content-type')?.includes('application/json')) {
    throw new Error(await extractErrorMessage(response))
  }
  throw new Error('An unexpected error occured')
}

const extractErrorMessage = async (response: Response) => {
  const data = await response.json()
  const message = data.message || 'An unexpected error occured'
  throw new Error(message)
}
