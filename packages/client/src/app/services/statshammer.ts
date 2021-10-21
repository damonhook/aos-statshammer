import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AbilitiesResponse } from 'common/types/api'

export const statshammerApi = createApi({
  reducerPath: 'statshammerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getAbilities: builder.query<AbilitiesResponse, void>({
      query: () => 'abilities',
    }),
  }),
})

export const { useGetAbilitiesQuery } = statshammerApi
