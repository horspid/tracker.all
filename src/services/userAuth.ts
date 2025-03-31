import { supabase } from "@config/database";
import { DatabaseUser } from "@interfaces/user";
import { useUserStore } from "@store/userStore";

const insertUserToDatabase = async (data: DatabaseUser) => {
  try {
    const { error } = await supabase.from("users").insert(data);

    if (error) {
      console.error("Ошибка при добавлении пользователя в БД:", error.message);
      throw new Error("Ошибка при добавлении пользователя в БД");
    }

  } catch (err) {
    console.error("Ошибка в insertUserToDatabase:", err);
  }
}

export const isUserPage = async (login: string) => {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return data.user.user_metadata.login === login ? true : false;
  }
}

export const findUserInDatabase = async (login: string) => {

  try {
    const isUserProfile = await isUserPage(login);
  
    if (isUserProfile) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('login', login)
        .single<DatabaseUser>(); 
  
      if (data) return data
      
    } else {
      const { data } = await supabase
        .from('users')
        .select('login, avatar_url, total_movies, total_serials')
        .eq('login', login)
        .single<DatabaseUser>(); 
  
        if (data) return data
      }
  } catch (error) {
    console.log('Пользователь не найден', error)
    throw new Error(`Error fetching user from 'users' table: ${error}`);
  }
}


export const signUp = async (email: string, password: string, login: string) => {

  const { setUser, setSession, setUserProfile } = useUserStore.getState();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          login: login,
        }
      }
    });

    if (error) throw new Error(error.message);

    if (data.user && data.session) {

      await insertUserToDatabase({ user_id: data.user.id, login, email });

      setUser(data.user);
      setSession(data.session)

      const result = await findUserInDatabase(login);

      if (result) {
        setUserProfile(result)
      }
    }
    
  } catch (dbError) {
    await logout()
    console.error("Ошибка при работе с БД:", dbError);
  }
};

export const signIn = async (email: string, password: string) => {
  const { setSession, setUser, setUserProfile } = useUserStore.getState();

  const loginData = { email, password };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    await logout()
    throw new Error(`Error during login: ${error.message}`);
  }

  setUser(data.user)
  setSession(data.session);
    
  const result = await findUserInDatabase(data.user.user_metadata.login)

  if (result) {
    setUserProfile(result)
  }
};


export const logout = async () => {
  const { setUser, setSession } = useUserStore.getState();
  const { logout } = useUserStore.getState();

  await supabase.auth.signOut();

  setUser(null);
  setSession(null);

  logout();
};


export const checkSession = async () => {

  const { setUser, setSession, setUserProfile } = useUserStore.getState();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    setUser(null);
    setSession(null);
    console.error("Error fetching session:", error.message);
  }

  if (data.session) {
    setUser(data.session.user);
    setSession(data.session);

    const result = await findUserInDatabase(data.session.user.user_metadata.login);

    if (result) {
      setUserProfile(result)
    }
  }
};

export const changeUserField = async (fields: { [key: string]: any }) => {

  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError.message);
    return null;
  }

  if (!data.session) {
    console.error("No active session found.");
    return null;
  }

  // Получаем ID пользователя
  const userId = data.session.user.id;

  // Проверяем, есть ли что-то для обновления
  if (!fields || Object.keys(fields).length === 0) {
    console.error("No fields to update.");
    return null;
  }

  // Логируем переданные поля и userId
  console.log("Fields to update:", fields);
  console.log("User ID:", userId);

  // Выполняем обновление
  try {
    const { data: updatedData, error } = await supabase
      .from('users') // указываем имя таблицы
      .update(fields) // передаем объект с полями для обновления
      .eq('user_id', userId) // обновляем пользователя по его ID
      .select();

    if (error) {
      console.error("Error updating user fields:", error.message);
      return null;
    }

    console.log("User fields updated successfully:", updatedData);
    return updatedData; // Возвращаем обновленные данные, чтобы их увидеть
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
