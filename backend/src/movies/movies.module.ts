import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TmdbModule } from '../tmdb/tmdb.module';
import { GenresService } from '../genres/genres.service';
import { LanguagesService } from '../languages/languages.service';

@Module({
  imports: [TmdbModule],
  controllers: [MoviesController],
  providers: [MoviesService, GenresService, LanguagesService],
})
export class MoviesModule {}
