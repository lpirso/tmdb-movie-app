import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule} from './genres/genres.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ ttl: 3600, isGlobal: true}),
    TmdbModule,
    MoviesModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
