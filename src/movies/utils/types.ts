export class CreateMovieParams {
  name: string;
  year: number;
  producer: string;
}

export class UpdateMovieParams {
  name: string;
  year: number;
  producer: string;
}

export class MovieParams {
  name?: string;
  year?: number;
  producer?: string;
}
