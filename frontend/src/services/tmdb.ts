import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Movie = unknown;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173' }),
  endpoints: (builder) => ({
    getMovieByName: builder.query<Movie, string>({
      query: (name) => `/search/movie?title=${name}`,
    }),
  }),
})

export const { useGetMovieByNameQuery } = tmdbApi;