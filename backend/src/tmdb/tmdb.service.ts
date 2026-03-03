import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import {
  TmdbMoviesResponse,
  TmdbGenresResponse,
  TmdbLanguage,
} from './tmdb-response.interface';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);
  private readonly baseUrl: string | undefined;
  private readonly readAccessToken: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL');
    this.readAccessToken = this.configService.get<string>(
      'TMDB_READ_ACCESS_TOKEN',
    );
  }

  private async fetchFromTmdb<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          params,
          headers: {
            Authorization: `Bearer ${this.readAccessToken}`,
            Accept: 'application/json',
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(`Failed to fetch from TMDB: ${error.message}`);
            throw new InternalServerErrorException('External API error');
          }),
        ),
    );

    return data;
  }

  public async searchMoviesByTitle(query: string): Promise<TmdbMoviesResponse> {
    const url = `${this.baseUrl}/search/movie`;

    const params = {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    };

    return this.fetchFromTmdb<TmdbMoviesResponse>(url, params);
  }

  public async discoverMovies(
    genreId: number | undefined,
  ): Promise<TmdbMoviesResponse> {
    const url = `${this.baseUrl}/discover/movie`;
    const params = {
      with_genres: genreId || '',
      include_adult: false,
      language: 'en-US',
      page: 1,
      sort_by: 'vote_count.desc',
    };

    return this.fetchFromTmdb<TmdbMoviesResponse>(url, params);
  }

  public async fetchGenres(): Promise<TmdbGenresResponse> {
    const url = `${this.baseUrl}/genre/movie/list`;

    const params = {
      language: 'en-US',
    };

    return this.fetchFromTmdb<TmdbGenresResponse>(url, params);
  }

  public async fetchLanguages(): Promise<TmdbLanguage[]> {
    const url = `${this.baseUrl}/configuration/languages`;

    return this.fetchFromTmdb<TmdbLanguage[]>(url);
  }
}
