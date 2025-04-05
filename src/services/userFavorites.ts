import { supabase } from "@config/database";
import { cardPreview } from "@interfaces/movies";
import { WatchlistDatabase } from "@interfaces/wathlist";
import { options } from "@config/config";

interface MovieResponse {
  docs: cardPreview[];
}

export const addToWatchlist = async (movieId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { error } = await supabase
    .from("watchlist")
    .insert({ movie_id: movieId, user_id: userData.user.id });

  if (error) {
    throw new Error(`Ошибка при добавлении в список: ${error.message}`);
  }
};

export const deleteFromWatchlist = async (movieId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("movie_id", movieId)
    .eq("user_id", userData.user.id)
    .single();

  if (error) {
    throw new Error(`Не удалось удалить фильм: ${error.message}`);
  }
};

export const isMovieInDatabase = async (movieId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.log("Пользователь не авторизован");
    return false;
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("movie_id", movieId)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) {
    console.log("Ошибка при получении фильма:", error.message);
    return false;
  }
  return !!data;
};

export const fetchMovie = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log("Пользователь не авторизован");
  }

  if (userData.user) {
    const { data: movieData, error } = await supabase
      .from("watchlist")
      .select<'*', WatchlistDatabase>()
      .eq("user_id", userData.user.id)

    if (error) {
      console.log("Ошибка при получении фильма:", error.message);
    }

    if (movieData) {
      const result = movieData.map((item) => item.movie_id)
      
      const fetchedMovies = await fetchMovieFromIds(result)
      return fetchedMovies;

    } else return [];
  }
}

export const fetchMovieFromIds = async (arr: number[]) => {
  try {
    const url = new URL(
      `https://api.kinopoisk.dev/v1.4/movie`,
    );

    arr.forEach(id => url.searchParams.append('id', id.toString()));

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
}