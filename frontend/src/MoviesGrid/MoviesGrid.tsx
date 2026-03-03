import { MovieCard } from "./MovieCard";
import { useAppSelector } from "../store/hooks";
import {
    useGetMoviesQuery,
    useSearchMoviesByTitleQuery,
    useGetGenresQuery,
} from "../store/tmdbApi";

export const MoviesGrid = () => {
    const { genreId, searchText } = useAppSelector((state) => state.filters);

    const searchResult = useSearchMoviesByTitleQuery(
        { title: searchText },
        {
            skip: !searchText,
        },
    );

    const moviesResult = useGetMoviesQuery(genreId ? { genreId } : undefined, {
        skip: !!searchText,
    });

    const activeQueryResponse = searchText ? searchResult : moviesResult;

    const { data, isLoading, isFetching, isError, error } = activeQueryResponse;

    const { data: genresData } = useGetGenresQuery();

    const selectedGenreName = () => {
        if (!genreId || !genresData) return null;
        return genresData.genres.find((g) => g.id === genreId)?.name ?? null;
    };

    if (isLoading) {
    }

    if (error) {
        console.error(error);
        return <p>Something went wrong!</p>;
    }

    const movies = data ?? [];
    let mainHeading;

    if (selectedGenreName()) {
        mainHeading = `Top Voted Movies in ${selectedGenreName()}`;
    } else if (searchText) {
        mainHeading = `Search results for: "${searchText}"`;
    } else {
        mainHeading = "Top Voted Movies";
    }

    return (
        <section>
            <h1>{mainHeading}</h1>
            {movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
            })}
        </section>
    );
};

// <>
// ||
// ``
