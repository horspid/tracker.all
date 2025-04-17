import { supabase } from "@config/database";
import { useUserStore } from "@store/userStore";
import { fetchMovieFromIds } from "./userFavorites";
import { UserRatings } from "@interfaces/movies";

export const insertRatedMovie = async (rate: number, movieId: number) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.error("Пользователь не авторизован");
    return;
  }

  const { data: existingRating } = await supabase
    .from("ratings")
    .select("*")
    .eq("user_id", user.id)
    .eq("movie_id", movieId)
    .maybeSingle();

  if (!existingRating) {
    const { error: updateError } = await supabase.rpc(
      "increment_total_movies",
      {
        user_id_param: user.id,
      }
    );

    if (updateError) {
      throw new Error(
        `Ошибка при обновлении фильма: ${updateError.message || updateError}`
      );
    }
  }

  const { error } = await supabase
    .from("ratings")
    .upsert(
      { movie_id: movieId, user_id: user.id, user_rating: rate },
      { onConflict: "user_id, movie_id" }
    );

  if (error) {
    throw new Error(`Ошибка при добавлении в список: ${error.message}`);
  }
};

export const fetchUserRatings = async () => {
  const { user } = useUserStore.getState();

  if (!user) {
    return { fetchedMovies: null, rated: null };
  }

  const { data, error } = await supabase
    .from("ratings")
    .select<"*", UserRatings>()
    .eq("user_id", user.id);

  if (error) {
    console.error("Ошибка при загрузке рейтингов:", error);
    return { fetchedMovies: [], rated: [] };
  }

  if (!data || data.length === 0) {
    return { fetchedMovies: [], rated: [] };
  }

  const result = data.map((item) => item.movie_id);
  const fetchedMovies = await fetchMovieFromIds(result);

  return { fetchedMovies, rated: data };
};
