import { supabase } from "@config/database";
import { useUserStore } from "@store/userStore";
import { fetchMovieFromIds } from "./userFavorites";

export const insertRatedMovie = async (rating: number, movieId: number) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return;
  }

  const { data: existingRating, error: fetchError } = await supabase
    .from("ratings")
    .select("*")
    .eq("user_id", user.id)
    .eq("movie_id", movieId)
    .single(); 

  if (fetchError) {
    throw new Error(`Ошибка при проверке рейтинга: ${fetchError.message}`);
  }

  let updateCountError = null;
  
  if (!existingRating) {
    const { error: updateError } = await supabase.rpc('increment_total_movies', {
      user_id_param: user.id
    });

    if (updateError) {
      updateCountError = updateError; 
    }
  }

  const { error } = await supabase
    .from("ratings")
    .upsert(
      { movie_id: movieId, user_id: user.id, user_rating: rating },
      { onConflict: "user_id, movie_id" }
    );

  if (error) {
    throw new Error(`Ошибка при добавлении в список: ${error.message}`);
  }

  if (updateCountError) {
    throw new Error(`Ошибка при увеличении счётчика: ${updateCountError.message}`);
  }
};


export const fetchUserRatings = async () => {
  const { user } = useUserStore.getState();
  const { setUserRatings } = useUserStore.getState();

  if (!user) {
    setUserRatings(null);
    return null;
  }

  const { data, error } = await supabase
    .from("ratings")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Ошибка при загрузке рейтингов:", error);
    setUserRatings([]);
    return [];
  }

  if (!data || data.length === 0) {
    setUserRatings([]);
    return [];
  }
  setUserRatings(data);
  const result = data.map((item) => item.movie_id);
  const fetchedMovies = await fetchMovieFromIds(result);

  return fetchedMovies;
};

