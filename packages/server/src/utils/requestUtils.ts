import humps from 'humps'

export function withCaseConversion<T extends object, R extends object>(
  request: object,
  fetchResponse: (arg0: T) => R
): object {
  const requestData = humps.camelizeKeys(request) as T
  const responseData = fetchResponse(requestData)
  return humps.decamelizeKeys(responseData)
}
