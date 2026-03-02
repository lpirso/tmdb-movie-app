import { Injectable, NotFoundException } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async searchMovies(title: string) {
    console.log("YOOOOO")
    const tmdbResponse = await this.tmdbService.searchMoviesByTitle(title);

    if (!tmdbResponse.results || tmdbResponse.results.length === 0) {
      throw new NotFoundException(`No movies found matching the title: ${title}`);
    }

    const resp = tmdbResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : null,
      releaseYear: movie.release_date 
        ? movie.release_date.split('-')[0] 
        : 'Unknown', 
    }));

      return resp;
  }

   async getMovies(genreId?: number) {
    const tmdbResponse = await this.tmdbService.discoverMovies(genreId);

    if (!tmdbResponse.results || tmdbResponse.results.length === 0) {
      throw new NotFoundException(`No movies found`);
    }

    const resp = tmdbResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : null,
      releaseYear: movie.release_date 
        ? movie.release_date.split('-')[0] 
        : 'Unknown', 
    }));

      return resp;
  }
}

//<>