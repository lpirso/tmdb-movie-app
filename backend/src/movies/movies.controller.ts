
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMovieDto } from './dto/search-movie.dto';

@Controller('search')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

  @Get("movie")
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: SearchMovieDto,
) {
    const res = await this.moviesService.searchMovies(query.title);

    return res;
  }
}
