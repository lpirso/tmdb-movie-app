import { MovieCard } from "./movieCard/MovieCard";
import { useAppSelector } from "../../store/hooks";
import {
  useGetMoviesQuery,
  useSearchMoviesByTitleQuery,
  useGetGenresQuery,
} from "../../store/tmdbApi";
import { Heading1, Heading3 } from "../shared.styles";
import { MovieGridWrapper } from "./MovieGrid.styles";

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

  const { data, isLoading, error } = activeQueryResponse;

  const { data: genresData } = useGetGenresQuery();

  const getSelectedGenreName = () => {
    if (!genreId || !genresData) return null;
    return genresData.genres.find((genre) => genre.id === genreId)?.name ?? null;
  };

  if (isLoading) {
    return <Heading3>Imagine there is a pretty loading animation here...</Heading3>;
  }

  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }

  const movies = data ?? [];
  let mainHeading;

  if (getSelectedGenreName()) {
    mainHeading = `Top Voted Movies in ${getSelectedGenreName()}`;
  } else if (searchText) {
    mainHeading = `Search results for: "${searchText}"`;
  } else {
    mainHeading = "Top Voted Movies";
  }

  return (
    <>
      <Heading1>{mainHeading}</Heading1>
      <MovieGridWrapper>
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </MovieGridWrapper>
    </>
  );
};
