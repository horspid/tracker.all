interface Genre {
  genre: string;
}

interface Country {
  country: string;
}

export interface MovieResponse {
  total: number;
  totalPages: number;
  items: Movie[];
}

export interface Movie {
  countries: Country[];
  coverUrl: string | null;
  description: string;
  genres: Genre[];
  imdbId: number | null;
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