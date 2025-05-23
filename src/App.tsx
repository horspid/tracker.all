import { BrowserRouter, Routes, Route } from "react-router";
import Browse from "@routes/Browse";
import MainLayout from "@layouts/MainLayout";
import Categories from "@routes/Categories";
import Watchlist from "@routes/Watchlist";
import Soon from "@routes/Soon";
import Ratings from "@routes/Ratings";
import MoviePage from "@routes/MoviePage";
import CategoryPage from "@routes/CategoryPage";
import Profile from "@routes/Profile";
import Login from "@routes/Login";
import { useEffect } from "react";
import { checkSession } from "@services/userAuth";
import { fetchUserRatings } from "@services/userRatings";
import Registration from "@routes/Registration";
import GlobalSearch from "@routes/GlobalSearch";
import { useUserStore } from "@store/userStore";

function App() {
  const user = useUserStore((state) => state.user);

  const initialSession = async () => {
    const { setUser, setSession } = useUserStore.getState();

    const result = await checkSession();

    if (!result) {
      setUser(null);
      setSession(null);
    }

    if (result && result.session) {
      setUser(result.session.user);
      setSession(result.session);
    }
  };

  const initialRatings = async () => {
    const { setUserRatings } = useUserStore.getState();

    if (user) {
      const result = await fetchUserRatings();

      if (!result) return setUserRatings([]);

      setUserRatings(result.rated);
    }
  };

  useEffect(() => {
    initialSession();
  }, []);

  useEffect(() => {
    initialRatings();
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Browse />} />
          <Route path="categories" element={<Categories />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="soon" element={<Soon />} />
          <Route path="movies/:id" element={<MoviePage />} />
          <Route path="categories/:name" element={<CategoryPage />} />
          <Route path="profile/:login" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="search" element={<GlobalSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
