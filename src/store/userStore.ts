import { DatabaseUser } from "@interfaces/user";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {

  user: User | null;
  session: Session | null;

  userProfile: DatabaseUser | null;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;

  setUserProfile: (userProfile: DatabaseUser) => void

  logout: () => void;
}

    
export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  userProfile: null,

  setUserProfile: (userProfile) => set({ userProfile }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),

  logout: async () => {
    set({ user: null, session: null });
  },
}));

