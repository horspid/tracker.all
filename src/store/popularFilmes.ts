import { create } from "zustand";
import { options } from "@config/config";
import { Movie, MoviePreview, Movies } from "@interfaces/movies";

interface MovieStore{
  data: [] | MoviePreview[];
  getData: () => Promise<MoviePreview[]>;
}

const popularFilms = async () => {
  try {
    const url = new URL(
      'https://api.kinopoisk.dev/v1.4/movie?limit=20&sortField=votes.kp&sortType=-1',
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data: Movies = await response.json();
    return data.docs;

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
