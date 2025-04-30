import Movie from "@assets/images/icons/movie.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";
import SkeletonCard from "@components/ui/SkeletonCard";
import { popularFilms } from "@services/Browse";
import { cardPreview } from "@interfaces/movies";

const Browse = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<cardPreview[]>([]);

  const initialBrowse = async () => {
    try {
      const result = await popularFilms();

      if (!result) return;
      setData(result);
    } catch (error) {
      console.error("Ошибка в initialBrowse:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialBrowse();
  }, []);

  return (
    <section className="mt-40 section-container">
      <div className="card-container">
        {loading && <SkeletonCard listToRender={10} />}
        {data.map((item, index) => (
          <ProductCard key={item.id} data={item} cardIndex={index} />
        ))}
      </div>
    </section>
  );
};
export default Browse;
