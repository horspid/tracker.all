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
import Index from "@routes/Authorization/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Browse />} />
          <Route path="categories" element={<Categories />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="ratings" element={<Soon />} />
          <Route path="soon" element={<Ratings />} />
          <Route path="movies/:id" element={<MoviePage />} />
          <Route path="categories/:name" element={<CategoryPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
