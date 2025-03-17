export interface Movies {
  docs: MoviePreview[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface MoviePreview {
  id: number
  name: string
  alternativeName: string
  enName: any
  type: string
  poster: Poster
  rating: Rating
  year: number
}


export interface Movie extends MoviePreview {
  names: Name[]
  typeNumber: number
  description: string
  shortDescription: string
  status?: string
  similarMovies?: MoviePreview[]
  votes: Votes
  movieLength?: number
  totalSeriesLength: any
  seriesLength?: number
  ratingMpaa?: string
  ageRating: number
  backdrop: Backdrop
  genres: Genre[]
  countries: Country[]
  top10: any
  top250?: number
  isSeries: boolean
  ticketsOnSale: boolean
  logo?: Logo
  releaseYears?: ReleaseYear[]
  externalId: ExternalId
  slogan: string
  persons: Person[]
  budget: Budget
  premiere: Premiere
  watchability: Watchability
  audience: Audience[]
  lists: string[]
  networks: any
  createdAt: string
  updatedAt: string
  fees: Fees
  sequelsAndPrequels?: SequelsAndPrequel[]
  videos: Videos
  isTmdbChecked: boolean
}

export interface ExternalId {
  kpHD: string
  imdb: string
  tmdb: number
}

export interface Person {
  id: number
  photo: string
  name: string
  enName?: string
  description?: string
  profession: string
  enProfession: string
}

export interface Budget {
  currency: string
  value: number
}

export interface Premiere {
  country: any
  digital: any
  cinema: any
  bluray: string
  dvd: string
  russia: string
  world: string
}

export interface Watchability {
  items: Item[]
}

export interface Item {
  name: string
  logo: Logo
  url: string
}


export interface Audience {
  count: number
  country: string
}

export interface Fees {
  russia: Russia
  usa: Usa
  world: World
}

export interface Russia {
  value: number
  currency: string
}

export interface Usa {
  value: number
  currency: string
}

export interface World {
  value: number
  currency: string
}

export interface SequelsAndPrequel {
  id: number
  name: string
  alternativeName: string
  enName: any
  type: string
  poster: Poster
  year: number
  rating: Rating
}

export interface Videos {
  trailers: Trailer[]
}

export interface Trailer {
  url: string
  name: string
  site: string
  type: string
}


export interface Name {
  name: string
  language?: string
  type?: string
}

export interface Rating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Poster {
  url: string
  previewUrl: string
}

export interface Backdrop {
  url: string
  previewUrl: string
}

export interface Genre {
  name: string
}

export interface Country {
  name: string
}

export interface Logo {
  url?: string
  previewUrl?: string
}

export interface ReleaseYear {
  start: number
  end?: number
}


