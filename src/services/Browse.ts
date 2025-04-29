import { options } from "@config/config";
import { cardPreview } from "@interfaces/movies";

interface MovieResponse {
  docs: cardPreview[];
}

export const popularFilms = async () => {
  try {
    const url = new URL(
      "https://api.kinopoisk.dev/v1.4/movie?limit=100&sortField=votes.kp&sortType=-1"
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: MovieResponse = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Ошибка при запросе к популярным фильмам");
    return null;
  }
};
