import { supabase } from "@config/database";
import { DatabaseUser } from "@interfaces/user";
import { useUserStore } from "@store/userStore";

const insertUserToDatabase = async (data: DatabaseUser): Promise<void> => {
  const { error } = await supabase.from("users").insert(data);

  if (error) {
    throw new Error(`Failed to insert user into database: ${error.message}`);
  }
};

export const isUserPage = async (login: string): Promise<boolean> => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
    return false;
  }

  return user.user_metadata.login === login;
};

export const findUserInDatabase = async (login: string) => {
  try {
    const isUserProfile = await isUserPage(login);

    if (isUserProfile) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("login", login)
        .single<DatabaseUser>();

      if (data) return data;
    } else {
      const { data } = await supabase
        .from("users")
        .select("login, avatar_url, total_movies, total_serials")
        .eq("login", login)
        .single<DatabaseUser>();

      if (data) return data;
    }
  } catch (error) {
    console.log("Пользователь не найден", error);
    throw new Error(`Пользователь не найден: ${error}`);
  }
};

export const signUp = async (
  email: string,
  password: string,
  login: string,
) => {
  const { setUser, setSession, setUserProfile } = useUserStore.getState();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          login: login,
        },
      },
    });

    if (error) throw new Error(error.message);

    if (data.user && data.session) {
      await insertUserToDatabase({
        user_id: data.user.id,
        login,
        email,
        total_movies: 0,
        total_serials: 0,
      });

      setUser(data.user);
      setSession(data.session);

      const result = await findUserInDatabase(login);

      if (result) {
        setUserProfile(result);
      }
    }
  } catch (dbError) {
    await logout();
    console.error("Ошибка при работе с БД:", dbError);
  }
};

export const signIn = async (email: string, password: string) => {
  const { setSession, setUser, setUserProfile } = useUserStore.getState();

  const loginData = { email, password };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    await logout();
    throw new Error(`Error during login: ${error.message}`);
  }

  setUser(data.user);
  setSession(data.session);

  const result = await findUserInDatabase(data.user.user_metadata.login);

  if (result) {
    setUserProfile(result);
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

    const result = await findUserInDatabase(
      data.session.user.user_metadata.login,
    );

    if (result) {
      setUserProfile(result);
    }
  }
};

export const changeUserField = async (fields: { [key: string]: any }) => {
  const { user } = useUserStore.getState();

  if (!user) {
    console.log("Пользователь не авторизован");
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
