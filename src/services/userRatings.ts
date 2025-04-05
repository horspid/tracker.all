import { supabase } from "@config/database";
import { useUserStore } from "@store/userStore";
import { fetchMovieFromIds } from "./userFavorites";

export const insertRatedMovie = async (rating: number, movieId: number ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        throw new Error("Пользователь не авторизован");
    }
  
    const { error } = await supabase
      .from("ratings")
      .upsert({ movie_id: movieId, user_id: userData.user.id, user_rating: rating }, { onConflict: 'user_id, movie_id' });
  
    if (error) {
      throw new Error(`Ошибка при добавлении в список: ${error.message}`);
    }
};

export const fetchUserRatings = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const { setUserRatings } = useUserStore.getState();

    if (userError || !userData.user) {
        throw new Error("Пользователь не авторизован");
    }

    const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .eq("user_id", userData.user.id)

    if (error) {
        console.error("Ошибка при загрузке рейтингов:", error);
        throw new Error("Ошибка при загрузке рейтингов");
    }
    
    if (!data || data.length === 0) {
        console.log("У пользователя нет рейтингов.");
        return setUserRatings([]);
    }

    if (data) {
        setUserRatings(data);
        
        const result = data.map((item) => item.movie_id)
      
        const fetchedMovies = await fetchMovieFromIds(result)
        return fetchedMovies;
  
    } else return [];
}