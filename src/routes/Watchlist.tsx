import ProductCard from "@components/ui/ProductCard";
import { cardPreview } from "@interfaces/movies";
import { fetchMovie } from "@services/userFavorites";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SkeletonCard from "@components/ui/SkeletonCard";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<cardPreview[] | null | []>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const result = await fetchMovie();

      setWatchlist(result);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="section-container">
        <h1 className="w-500 h-60 bg-lightdark rounded-2xl"></h1>
        <div className="card-container">
          <SkeletonCard listToRender={8} />
        </div>
      </div>
    );
  }

  if (watchlist === null) {
    navigate(`/login`);
    return null;
  }

  if (watchlist.length === 0) {
    return (
      <section className="section-container">
        <h1 className="text-center text-4xl text-white font-bold mt-160">
          Пока-что вы не добавили ни один фильм / сериал :)
        </h1>
      </section>
    );
  }

  return (
    <section className="section-container">
      <h1 className="flex gap-20 items-center rounded-2xl font-semibold text-white text-4xl">
        ♥️ Избранное
      </h1>
      <div className="card-container">
        {watchlist.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Watchlist;
