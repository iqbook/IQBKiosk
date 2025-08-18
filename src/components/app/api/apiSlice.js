import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    credentials: 'include',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iqb-final.onrender.com' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001' }),
    tagTypes: ['adminloggin'],
    endpoints: builder => ({})
})

export const { useLoginQuery } = apiSlice