
import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [],
  providers: [LanguagesService],
})

export class LanguagesModule {}