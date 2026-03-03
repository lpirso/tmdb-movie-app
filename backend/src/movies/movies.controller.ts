import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './dto/search-movie.dto';
import { FetchMoviesDto } from './dto/fetch-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async fetchMovies(
    @Query(new ValidationPipe({ transform: true })) query: FetchMoviesDto,
  ) {
    return this.moviesService.fetchMovies(query?.genreId);
  }

  @Get('search')
  async searchMovies(
    @Query(new ValidationPipe({ transform: true })) query: SearchMoviesDto,
  ) {
    return this.moviesService.searchMovies(query.title);
  }
}
