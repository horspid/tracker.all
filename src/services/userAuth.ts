import { supabase } from "@config/database";
import { DatabaseUser } from "@interfaces/user";
import { useUserStore } from "@store/userStore";

const findUserInDatabase = async (id: string) => {
  const { setUser } = useUserStore.getState();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', id)
    .limit(1)
    .single<DatabaseUser>(); 

  if (error) {
    throw new Error(`Error fetching user from 'users' table: ${error.message}`);
  }

  if (!data) {
    console.error('Пользователь не найден')
  }

  setUser(data);
}


export const signUp = async (email: string, password: string, login: string) => {
  const { setSession } = useUserStore.getState();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (data.user) {

    const { error } = await supabase.from("users").insert([
        { user_id: data.user.id, login, email }
    ]);

    if (error) {
        throw new Error(`Error inserting into 'users' table: ${error.message}`);
    }

    await findUserInDatabase(data.user.id)
    setSession(data.session);
  }
};

export const signIn = async (email: string, password: string) => {
  const { setSession } = useUserStore.getState();

  const loginData = { email, password };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    throw new Error(`Error during login: ${error.message}`);
  }

  if (data.user) {
    await findUserInDatabase(data.user.id)
    setSession(data.session);
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
  const { setUser, setSession } = useUserStore.getState();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error.message);
    return null;
  }

  if (!data.session) {
    setUser(null);
    setSession(null);
    return null;
  }

  await findUserInDatabase(data.session.user.id);
  setSession(data.session);

  return data.session;
};