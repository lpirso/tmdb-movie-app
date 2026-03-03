import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { TmdbLanguage } from '../tmdb/tmdb-response.interface';
import { CACHE_DURATION } from '../app.module';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly tmdbService: TmdbService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchLanguages() {
    const cacheKey = 'languages';
    const cached = await this.cacheManager.get<TmdbLanguage[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const tmdbResponse = await this.tmdbService.fetchLanguages();

    if (!tmdbResponse || tmdbResponse.length === 0) {
      throw new NotFoundException(`Languages could not be fetched.`);
    }

    await this.cacheManager.set(cacheKey, tmdbResponse, CACHE_DURATION);

    return tmdbResponse;
  }
}
