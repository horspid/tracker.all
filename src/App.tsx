import { BrowserRouter, Routes, Route } from "react-router";
import Browse from "@routes/Browse";
import SidebarLayout from "@layouts/SidebarLayout";
import Categories from "@routes/Categories";
import Watchlist from "@routes/Watchlist";
import Soon from "@routes/Soon";
import Ratings from "@routes/Ratings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Browse />} />
          <Route path="categories" element={<Categories />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="soon" element={<Soon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
