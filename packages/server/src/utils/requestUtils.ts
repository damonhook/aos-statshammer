import humps, { HumpsProcessor } from 'humps'

interface CaseConversionOptions<T> {
  requestProcessor?: HumpsProcessor
  responseProcessor?: (request: T) => HumpsProcessor
}

export function withCaseConversion<T extends Record<string, unknown>, R extends Record<string, unknown>>(
  request: Record<string, unknown>,
  fetchResponse: (arg0: T) => R,
  options?: CaseConversionOptions<T>
): Record<string, unknown> {
  const requestData = humps.camelizeKeys(request, options?.requestProcessor) as T
  const responseData = fetchResponse(requestData)
  return humps.decamelizeKeys(
    responseData,
    options?.responseProcessor ? options.responseProcessor(requestData) : undefined
  ) as Record<string, unknown>
}
