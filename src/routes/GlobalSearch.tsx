import { cardPreview } from "@interfaces/movies";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductCard from "@components/ui/ProductCard";

const GlobalSearch = () => {
  const location = useLocation();
  const [data, setData] = useState<cardPreview[]>([]);

  useEffect(() => {
    if (location.state && location.state.search) {
      setData(location.state.search);
    }
  }, [location]);

  if (!data || data.length === 0) {
    return (
      <section className="section-container">
        <h1 className="text-center text-4xl text-white font-bold mt-160">
          По вашему запросу ничего не найдено 🙁
        </h1>
      </section>
    );
  }

  return (
    <section className="section-container">
      <div className="card-container">
        {data && data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default GlobalSearch;
