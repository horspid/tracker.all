import { create } from "zustand";
import { Movie } from "@interfaces/movies";
import { options } from "@config/config";


interface movieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface movieStore {
  films: [] | Movie[];
  getFilms: (currentPage: string) => Promise<Movie[]>;
}



const popularFilms = async (popularDate: string) => {
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/trending/movie/${popularDate}?language=en-US`,
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data: movieResponse = await response.json();
    return data.results;

  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useMovieStore = create<movieStore>((set) => ({
  films: [],
  getFilms: async (currentPage: string) => {
    const response = await popularFilms(currentPage);
    set({ films: response });
    return response;
  },
}));
