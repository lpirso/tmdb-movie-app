import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
    id: number;
    title: string;
    description: string;
    posterUrl: string | undefined;
    releaseYear: string;
    genres: Genre[];
    language: string | undefined;
};

export type Genre = {
    id: number;
    name: string;
};

export type GetMoviesParams = {
    genreId?: number;
};

export type MoviesResponse = Movie[];

export type GenresResponse = {
    genres: Genre[];
};

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<MoviesResponse, GetMoviesParams | undefined>({
            query: (params) => ({
                url: "/movies",
                params: params ?? undefined,
            }),
        }),

        searchMoviesByTitle: builder.query<
            MoviesResponse,
            { title: string }
        >({
            query: ({ title }) => ({
                url: "/movies/search",
                params: { title },
            }),
        }),

        getGenres: builder.query<GenresResponse, void>({
            query: () => ({
                url: "/genres",
            }),
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useSearchMoviesByTitleQuery,
    useGetGenresQuery,
} = tmdbApi;
