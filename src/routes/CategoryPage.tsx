import { useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { options } from "@config/config.ts";
import { cardPreview } from "@interfaces/movies.ts";
import ProductCard from "@components/ui/ProductCard";
import SkeletonCard from "@components/ui/SkeletonCard";

interface MovieResponse {
  docs: cardPreview[];
}

const CategoryPage = () => {
  const location = useLocation();
  const name = location.state.name;
  const nameUrl = location.state.nameUrl;

  const [data, setData] = useState<cardPreview[]>();

  const fetchCategories = useCallback(async () => {
    try {
      const url = new URL(
        `https://api.kinopoisk.dev/v1.4/movie?type=${nameUrl}&limit=100&sortField=votes.kp&sortType=-1`
      );

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: MovieResponse = await response.json();
      setData(data.docs);
      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="section-container">
      <h1 className="text-4xl text-white font-semibold">🔥 {name}</h1>
      <div className="card-container">
        {!data && <SkeletonCard listToRender={10} />}
        {data && data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default CategoryPage;
