import { supabase } from "@config/database";
import { cardPreview } from "@interfaces/movies";
import { WatchlistDatabase } from "@interfaces/wathlist";
import { options } from "@config/config";
import { useUserStore } from "@store/userStore.ts";

interface MovieResponse {
  docs: cardPreview[];
}

export const addToWatchlist = async (movieId: string) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { error } = await supabase
    .from("watchlist")
    .insert({ movie_id: movieId, user_id: user.id });

  if (error) {
    throw new Error(`Ошибка при добавлении в список: ${error.message}`);
  }
};

export const deleteFromWatchlist = async (movieId: string) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("movie_id", movieId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error(`Не удалось удалить фильм: ${error.message}`);
  }
};

export const isMovieInDatabase = async (movieId: string) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.log("Ошибка при получении фильма:", error.message);
    return false;
  }
  return !!data;
};

export const fetchMovie = async () => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return null;
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select<"*", WatchlistDatabase>()
    .eq("user_id", user.id);

  if (error) {
    console.error("Ошибка при загрузке рейтингов:", error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  const result = data.map((item) => item.movie_id);
  const fetchedMovies = await fetchMovieFromIds(result);

  return fetchedMovies;
};

export const fetchMovieFromIds = async (arr: number[]) => {
  try {
    const url = new URL(`https://api.kinopoisk.dev/v1.4/movie`);

    arr.forEach((id) => url.searchParams.append("id", id.toString()));

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: MovieResponse = await response.json();
    return data.docs;
  } catch (error) {
    console.error(error);
    return [];
  }
};
