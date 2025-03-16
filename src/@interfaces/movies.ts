export interface Genre {
  genre: string;
}

interface Country {
  country: string;
}

export interface MovieResponse {
  total: number;
  totalPages: number;
  items: MoviePreview[];
}

export interface MoviePreview {
  countries: Country[];
  coverUrl: string | null;
  description: string;
  genres: Genre[];
  imdbId: string | null;
  kinopoiskId: number;
  logoUrl: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingAgeLimits: string;
  ratingImdb: number | null;
  ratingKinopoisk: number | null;
  type: string;
  year: number;
}

export interface Movie extends MoviePreview{
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoiskVoteCount: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  filmLength: number;
  slogan: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  ratingMpaa: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
}
