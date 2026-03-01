import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { TmdbSearchResponse } from './tmdb-response.interface';

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

  async searchMovies(query: string): Promise<TmdbSearchResponse> {
    const url = `${this.baseUrl}/search/movie`;
    
    const { data } = await firstValueFrom(
      this.httpService.get<TmdbSearchResponse>(url, {
        params: {
          query,
          include_adult: false,
          language: 'en-US',
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${this.readAccessToken}`, // TMDB Read Access Token
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
}
