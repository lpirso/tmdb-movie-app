import type { Movie } from "../../../store/tmdbApi";
import { setGenreIdAndClearSearch } from "../../../store/filtersSlice";
import { useAppDispatch } from "../../../store/hooks";
import {
  MovieCardWrapper,
  Poster,
  MovieAttributesWrapper,
  GenresWrapper,
} from "./Moviecard.styles";
import { Button, Paragraph, Heading2, Heading3 } from "../../shared.styles";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { genres, language, description, posterUrl, releaseYear, title } = movie;
  const dispatch = useAppDispatch();

  const filterMoviesBySelectedGenre = (genreId: number) => {
    dispatch(setGenreIdAndClearSearch(genreId));
  };

  return (
    <MovieCardWrapper>
      <Poster alt={`Poster for the movie ${title}`} src={posterUrl} />
      <MovieAttributesWrapper>
        <Heading2>{title}</Heading2>
        <Heading3>{releaseYear}</Heading3>
        <Heading3>{language}</Heading3>
        <Paragraph>{description}</Paragraph>
        <GenresWrapper>
          {genres.map((genre) => {
            return (
              <Button
                onClick={() => {
                  filterMoviesBySelectedGenre(genre.id);
                }}
                key={genre.id}
              >
                {genre.name}
              </Button>
            );
          })}
        </GenresWrapper>
      </MovieAttributesWrapper>
    </MovieCardWrapper>
  );
};
