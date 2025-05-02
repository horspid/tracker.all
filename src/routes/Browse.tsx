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
    <section className="section-container">
      <h1 className="text-4xl text-white font-semibold">🔥 Популярное</h1>
      <div className="card-container">
        {loading && <SkeletonCard listToRender={10} />}
        {data.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};
export default Browse;
