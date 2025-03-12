import { create } from "zustand";

const API_KEY = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const popularFilms = async (popularDate: string) => {
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/trending/movie/${popularDate}?language=en-US`,
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const useMovieStore = create((set) => ({
  films: [],
  getFilms: async (currentPage: string) => {
    const response = await popularFilms(currentPage);
    set({ films: response });
  },
}));
