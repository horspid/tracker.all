import { supabase } from "@config/database";
import { DatabaseUser } from "@interfaces/database";
import { useUserStore } from "@store/userStore";

const insertUserToDatabase = async (data: DatabaseUser): Promise<boolean> => {
  const { error } = await supabase.from("users").insert(data);

  if (error) {
    throw new Error(`Ошибка в занесении данных в database: ${error.message}`);
  }

  return true;
};

const isUserPage = (login: string): boolean => {
  const { user } = useUserStore.getState();

  if (!user) {
    return false;
  }

  return user.user_metadata.login === login;
};

export const findUserInDatabase = async (login: string) => {
  const isUserProfile = isUserPage(login);
  const selectFields = isUserProfile
    ? "*"
    : "login, avatar_url, total_movies, total_serials";

  const { data, error } = await supabase
    .from("users")
    .select(selectFields)
    .eq("login", login)
    .single<DatabaseUser>();

  if (error) {
    throw new Error(`Ошибка при запросе пользователя: ${error.message}`);
  }

  return { isUserPage: isUserProfile, user: data };
};

export const signUp = async (
  email: string,
  password: string,
  login: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        login: login,
      },
    },
  });

  if (error) {
    await logout();
    throw new Error(`Ошибка при регистрации пользователя: ${error.message}`);
  }

  if (!data.user || !data.session) {
    throw new Error("Ошибка при получении данных пользователя или сессии.");
  }

  const insertResult = await insertUserToDatabase({
    user_id: data.user.id,
    login,
    email,
    total_movies: 0,
    total_serials: 0,
  });

  if (!insertResult) {
    await logout();
    throw new Error(`Ошибка в занесении в базу данных`);
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    await logout();
    throw new Error(`Ошибка в логине или пароле: ${error.message}`);
  }

  return data;
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
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Ошибка в запросе к сессии");
  }
  return data;
};

export const changeUserField = async (fields: { [key: string]: any }) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.error("Пользователь не авторизован");
    return;
  }

  const login = user.user_metadata.login;

  if (!fields || Object.keys(fields).length === 0) {
    console.error("No fields to update.");
    return null;
  }

  try {
    const { error } = await supabase
      .from("users")
      .update(fields)
      .eq("login", login)
      .select();

    if (error) {
      console.error("Error updating user fields:", error.message);
      return null;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
