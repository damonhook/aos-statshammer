import humps, { HumpsProcessor } from 'humps'

interface CaseConversionOptions<T> {
  requestProcessor?: HumpsProcessor
  responseProcessor?: (request: T) => HumpsProcessor
}

export function withCaseConversion<T extends Record<any, any>, R extends Record<any, any>>(
  request: Record<any, any>,
  fetchResponse: (arg0: T) => R,
  options?: CaseConversionOptions<T>
): Record<string, any> {
  const requestData = humps.camelizeKeys(request, options?.requestProcessor) as T
  const responseData = fetchResponse(requestData)
  return humps.decamelizeKeys(
    responseData,
    options?.responseProcessor ? options.responseProcessor(requestData) : undefined
  ) as Record<string, any>
}
