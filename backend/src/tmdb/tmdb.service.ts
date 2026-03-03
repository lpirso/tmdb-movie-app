import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { TmdbMoviesResponse, TmdbGenresResponse, TmdbLanguage } from './tmdb-response.interface';

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
    this.readAccessToken = this.configService.get<string>('TMDB_READ_ACCESS_TOKEN');
  }

  async searchMoviesByTitle(query: string): Promise<TmdbMoviesResponse> {
    const url = `${this.baseUrl}/search/movie`;
    
    const { data } = await firstValueFrom(
      this.httpService.get<TmdbMoviesResponse>(url, {
        params: {
          query,
          include_adult: false,
          language: 'en-US',
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${this.readAccessToken}`,
          Accept: 'application/json',
        }
      }).pipe(
        catchError((error) => {
          this.logger.error(`Failed to fetch movies from TMDB: ${error.message}`);
          throw new InternalServerErrorException('External API error');
        }),
      ),
    );

    return data;
  }

  async discoverMovies(genreId: number | undefined): Promise<TmdbMoviesResponse> {
    const url = `${this.baseUrl}/discover/movie`;

    const { data } = await firstValueFrom(
      this.httpService.get<TmdbMoviesResponse>(url, {
        params: {
          with_genres: genreId || '',
          include_adult: false,
          language: 'en-US',
          page: 1,
          sort_by: 'vote_count.desc'
        },
        headers: {
          Authorization: `Bearer ${this.readAccessToken}`,
          Accept: 'application/json',
        }
      }).pipe(
        catchError((error) => {
          this.logger.error(`Failed to fetch movies from TMDB: ${error.message}`);
          throw new InternalServerErrorException('External API error');
        }),
      ),
    );

    return data;
  }

  async getGenres(): Promise<TmdbGenresResponse>{
    const url = `${this.baseUrl}/genre/movie/list`;

    const { data } = await firstValueFrom(
      this.httpService.get<TmdbGenresResponse>(url, {
        params: {
          language: 'en-US',
        },
        headers: {
          Authorization: `Bearer ${this.readAccessToken}`,
          Accept: 'application/json',
        }
      }).pipe(
        catchError((error) => {
          this.logger.error(`Failed to fetch genres from TMDB: ${error.message}`);
          throw new InternalServerErrorException('External API error');
        }),
      ),
    );

    return data;
  }

  async getLanguages(): Promise<TmdbLanguage[]>{
    const url = `${this.baseUrl}/configuration/languages`;

    const { data } = await firstValueFrom(
      this.httpService.get<TmdbLanguage[]>(url, {
        headers: {
          Authorization: `Bearer ${this.readAccessToken}`,
          Accept: 'application/json',
        }
      }).pipe(
        catchError((error) => {
          this.logger.error(`Failed to fetch languages from TMDB: ${error.message}`);
          throw new InternalServerErrorException('External API error');
        }),
      ),
    );

    return data;
  }
}
