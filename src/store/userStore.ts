import { DatabaseUser } from "@interfaces/user";
import { create } from "zustand";

interface UserState {
    user: any;
    session: any;
    setUser: (user: DatabaseUser | null) => void;
    setSession: (session: any) => void;
    logout: () => void;
}

    
export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  logout: async () => {
    set({ user: null, session: null });
  },
}));

