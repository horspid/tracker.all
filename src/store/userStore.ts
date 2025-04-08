import { UserRatings } from "@interfaces/movies";
import { DatabaseUser } from "@interfaces/user";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | null;
  session: Session | null;

  userProfile: DatabaseUser | null;
  userRatings: UserRatings[] | [] | null;

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setUserRatings: (userRatings: UserRatings[] | [] | null) => void;
  setUserProfile: (userProfile: DatabaseUser) => void;

  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  userProfile: null,
  userRatings: [],

  setUserProfile: (userProfile) => set({ userProfile }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setUserRatings: (userRatings) => set({ userRatings }),

  logout: async () => {
    set({ user: null, session: null });
  },
}));
