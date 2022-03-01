import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AbilitiesResponse, ComparisonRequest, ComparisonResponse } from 'common/types/api'
import { filterActiveUnits } from 'common/utils/unitUtils'
import humps from 'humps'

const transformResponse = <R extends Record<string, unknown>, T>(response: R): T =>
  humps.camelizeKeys(response) as unknown as T

export const statshammerApi = createApi({
  reducerPath: 'statshammerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getAbilities: builder.query<AbilitiesResponse, void>({
      query: () => 'abilities',
      transformResponse,
    }),
    getComparison: builder.query<ComparisonResponse, ComparisonRequest>({
      query({ units }) {
        const body = humps.decamelizeKeys({ units: filterActiveUnits(units) })
        return {
          url: 'compare',
          method: 'POST',
          body,
        }
      },
      transformResponse,
    }),
  }),
})

export const { useGetAbilitiesQuery, useGetComparisonQuery } = statshammerApi
