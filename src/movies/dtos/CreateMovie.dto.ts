import {
  IsString,
  IsInt,
  Length,
  Min,
  Max,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888) // The year the first movie was made
  @Max(new Date().getFullYear()) // Restrict to the current year
  year: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  producer: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
