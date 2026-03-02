import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class GetMoviesDto {
//  @IsString({ message: 'The search title must be a string' })
//  @IsNotEmpty({ message: 'Please provide a movie title to search for' })
//  @MinLength(2, { message: 'The search title must be at least 2 characters long' })
  genreId?: number;
}