import { BrowserRouter, Routes, Route } from "react-router";
import Browse from "@routes/Browse";
import MainLayout from "@layouts/MainLayout.tsx";
import Categories from "@routes/Categories";
import Watchlist from "@routes/Watchlist";
import Soon from "@routes/Soon";
import Ratings from "@routes/Ratings";
import MoviePage from "@routes/MoviePage";
import CategoryPage from "@routes/CategoryPage";
import Profile from "@routes/Profile";
import Login from "@routes/Authorization/Login";
import { useEffect, useState } from "react";
import { checkSession } from "@services/userAuth";
import { fetchUserRatings } from "@services/userRatings";
import Registration from "@routes/Authorization/Register";
import GlobalSearch from "@routes/GlobalSearch";

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchUserRatings();

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <p>Загрузка...</p>;

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
