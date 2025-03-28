import { DatabaseUser } from "@interfaces/user";
import { create } from "zustand";

interface UserState {
    user: any;
    session: any;
    otherUser: DatabaseUser | null,
    setUser: (user: DatabaseUser | null) => void;
    setOtherUser: (otherUser: DatabaseUser | null) => void;
    setSession: (session: any) => void;
    logout: () => void;
}

    
export const useUserStore = create<UserState>((set) => ({
  user: null,
  otherUser: null,
  session: null,
  setOtherUser: (otherUser) => set({ otherUser }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  logout: async () => {
    set({ user: null, session: null });
  },
}));

