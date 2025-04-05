export type MovieType =
  | "movie"
  | "tv-shows"
  | "cartoon"
  | "animated-series"
  | "anime";

export interface cardPreview {
  id: number;
  name: string | null;
  alternativeName: string | null;
  rating?: Rating | null;
  poster: Poster;
  type: MovieType;
}

export interface cardDetails extends cardPreview {
  votes: Votes;
  countries: Country[] | [];
  year: number;
  genres: Genre[];
  description: string | null;
  movieLength: number | null;
  fees: Fees;
  sequelsAndPrequels: cardPreview[];
  similarMovies: cardPreview[];
}

export interface UserRatings {
  id: number;
  movie_id: number;
  user_id: string;
  user_rating: number;
}

interface Fees {
  world: FeesWorld;
}

interface FeesWorld {
  currency?: string;
  value?: number;
}

export interface Genre {
  name: string;
}

interface Votes {
  imdb: number | null;
  kp: number | null;
}

interface Country {
  name: string;
}

interface Poster {
  url: string | null;
  previewUrl: string | null;
}

interface Rating {
  imdb: number | null;
  kp: number | null;
}

