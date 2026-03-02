import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import { TmdbLanguage } from '../tmdb/tmdb-response.interface';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly tmdbService: TmdbService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

  async getLanguages() {
    const cacheKey = 'languages';
    const cached = await this.cacheManager.get<TmdbLanguage[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const tmdbResponse = await this.tmdbService.getLanguages();

    if (!tmdbResponse || tmdbResponse.length === 0) {
      throw new NotFoundException(`Languages could not be fetched.`);
    }

    await this.cacheManager.set(cacheKey, tmdbResponse, 3600);

    return tmdbResponse;
  }
}