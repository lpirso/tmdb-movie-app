import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './dto/search-movie.dto';
import { GetMoviesDto } from './dto/get-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(
    @Query(new ValidationPipe({ transform: true })) query: GetMoviesDto,
  ) {
    const res = await this.moviesService.getMovies(query?.genreId);

    return res;
  }

  @Get('search')
  async searchMovies(
    @Query(new ValidationPipe({ transform: true })) query: SearchMoviesDto,
  ) {
    const res = await this.moviesService.searchMovies(query.title);

    return res;
  }
}
