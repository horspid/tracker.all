import { supabase } from "@config/database";

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

export const fetchMovie = async (movieId: string) => {
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
