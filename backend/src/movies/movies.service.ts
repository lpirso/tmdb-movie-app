import { Injectable, NotFoundException } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { GenresService } from '../genres/genres.service';
import { LanguagesService } from '../languages/languages.service';
import {
  TmdbGenre,
  TmdbLanguage,
  TmdbMoviesResponse,
} from '../tmdb/tmdb-response.interface';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseYear: string;
  genres: TmdbGenre[];
  language: string | undefined;
}

@Injectable()
export class MoviesService {
  constructor(
    private readonly tmdbService: TmdbService,
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
  ) {}

  private async transformResponse(
    tmdbResponse: TmdbMoviesResponse,
  ): Promise<Movie[]> {
    const { genres: allGenres } = await this.genresService.getGenres();
    const allLanguages = await this.languagesService.getLanguages();

    const movies = tmdbResponse.results.map((movie) => {
      const genres = allGenres.filter((genre) => {
        if (movie.genre_ids.includes(genre.id)) {
          return genre;
        }
      });

      const language = allLanguages.find((language: TmdbLanguage) => {
        return language.iso_639_1 === movie.original_language;
      });

      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        backdropUrl: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        releaseYear: movie.release_date
          ? movie.release_date.split('-')[0]
          : 'Unknown',
        genres,
        language: language?.english_name,
      };
    });

    return movies;
  }

  async searchMovies(title: string) {
    const tmdbResponse = await this.tmdbService.searchMoviesByTitle(title);

    if (!tmdbResponse.results || tmdbResponse.results.length === 0) {
      throw new NotFoundException(
        `No movies found matching the title: ${title}`,
      );
    }

    return this.transformResponse(tmdbResponse);
  }

  async getMovies(genreId?: number) {
    const tmdbResponse = await this.tmdbService.discoverMovies(genreId);

    if (!tmdbResponse.results || tmdbResponse.results.length === 0) {
      throw new NotFoundException(`No movies found`);
    }

    return this.transformResponse(tmdbResponse);
  }
}
