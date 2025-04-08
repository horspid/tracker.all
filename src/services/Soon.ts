import { options } from "@config/config";
import { cardPreview } from "@interfaces/movies";

interface MovieResponse {
    docs: cardPreview[];
}

export const fetchMoviesByMonth = async (month: number) => {
    try {

        const date = new Date();

        const firstDay = new Date(date.getFullYear(), month, 1).toLocaleDateString('en-GB').split('/').join('.');
        const lastDay = new Date(date.getFullYear(), month + 1, 0).toLocaleDateString('en-GB').split('/').join('.');
        
        const url = new URL(
            "https://api.kinopoisk.dev/v1.4/movie",
        );

        url.searchParams.append('premiere.russia', `${firstDay}-${lastDay}`)
        url.searchParams.append('limit', '20')

        const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
  
      const data: MovieResponse = await response.json();
      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  };