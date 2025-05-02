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
  backdrop: Poster;
  shortDescription: string;
}

export interface cardDetails extends cardPreview {
  votes: Votes;
  countries: Country[] | [];
  year: number;
  genres: Genre[];
  persons: Person[];
  description: string | null;
  movieLength: number | null;
  fees: Fees;
  sequelsAndPrequels: cardPreview[];
  similarMovies: cardPreview[];
}

export interface Person {
  id: number;
  photo: string;
  name: string;
  profession: string;
}

export interface Fees {
  russia?: FeesWorld;
  world?: FeesWorld;
}

export interface FeesWorld {
  currency: string;
  value: number;
}

export interface UserRatings {
  id: number;
  movie_id: number;
  user_id: string;
  user_rating: number;
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
