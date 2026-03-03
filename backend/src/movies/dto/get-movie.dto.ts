import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMoviesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Genre ID must be an integer' })
  @Min(1, { message: 'Genre ID must be greater than 0' })
  genreId?: number;
}