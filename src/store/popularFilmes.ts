import { create } from "zustand";
import { options } from "@config/config";
import { Movie, MovieResponse } from "@interfaces/movies";

interface MovieStore{
  data: [] | Movie[];
  getData: () => Promise<Movie[]>;
}

const popularFilms = async () => {
  try {
    const url = new URL(
      'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1',
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data: MovieResponse = await response.json();
    return data.items;

  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useMovieStore = create<MovieStore>((set) => ({
  data: [],
  getData: async () => {
    const response = await popularFilms();
    set({ data: response });
    return response;
  },
}));
