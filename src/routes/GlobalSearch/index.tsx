import { cardPreview } from "@interfaces/movies";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styles from "./GlobalSearch.module.scss";
import SearchICO from "@assets/images/icons/search.svg?react";
import ProductCard from "@components/ui/ProductCard";

const GlobalSearch = () => {
  const location = useLocation();
  const [data, setData] = useState<cardPreview[]>([]);

  useEffect(() => {
    if (location.state && location.state.search) {
      setData(location.state.search);
    }
  }, [location]);

  if (data.length === 0) {
    return (
      <section className={styles.search_error}>
        <h1 className={styles.search_error__title}>
          По вашему запросу ничего не найдено :)
        </h1>
      </section>
    );
  }

  return (
    <section className={styles.search}>
      <div className={styles.search__heading}>
        <div className={styles.search__entry}>
          <SearchICO className={styles.ico__search} />
          <h1 className={styles.search__title}>Search</h1>
        </div>
      </div>
      <div className={styles.search__items}>
        {data.length &&
          data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default GlobalSearch;
