import { Injectable, NotFoundException } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class GenresService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() {
    const tmdbResponse = await this.tmdbService.getGenres();

    if (!tmdbResponse.genres || tmdbResponse.genres.length === 0) {
      throw new NotFoundException(`Genres could not be fetched.`);
    }

    const resp = tmdbResponse.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

      return resp;
  }
}

//<>