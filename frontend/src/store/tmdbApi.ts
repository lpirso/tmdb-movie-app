import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
  id: number | string;
  title: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type GetMoviesParams = {
  genreId?: number;
  page?: number;
};

export type MoviesResponse = {
  items: Movie[];
  page?: number;
  totalPages?: number;
};

export type GenresResponse = {
  items: Genre[];
};

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, GetMoviesParams | undefined>({
      query: (params) => ({
        url: '/movies',
        params: params ?? undefined,
      }),
    }),

    searchMoviesByTitle: builder.query<MoviesResponse, { title: string; page?: number }>({
      query: ({ title, page }) => ({
        url: '/movies/search',
        params: { title, page },
      }),
    }),

    getGenres: builder.query<GenresResponse, void>({
      query: () => ({
        url: '/genres',
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useSearchMoviesByTitleQuery,
  useGetGenresQuery,
} = tmdbApi;
