import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { TmdbGenresResponse } from '../tmdb/tmdb-response.interface';
import { CACHE_DURATION } from '../app.module';

@Injectable()
export class GenresService {
  constructor(
    private readonly tmdbService: TmdbService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchGenres() {
    const cacheKey = 'genres';
    const cached = await this.cacheManager.get<TmdbGenresResponse>(cacheKey);

    if (cached) {
      return cached;
    }

    const tmdbResponse = await this.tmdbService.fetchGenres();

    if (!tmdbResponse.genres || tmdbResponse.genres.length === 0) {
      throw new NotFoundException(`Genres could not be fetched.`);
    }

    await this.cacheManager.set(cacheKey, tmdbResponse, CACHE_DURATION);

    return tmdbResponse;
  }
}
