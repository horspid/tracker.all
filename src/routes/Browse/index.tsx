import styles from "./Browse.module.scss";
import Movie from "@assets/images/icons/movie.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";
import SkeletonCard from "@components/ui/SkeletonCard";
import { popularFilms } from "@services/Browse";
import { cardPreview } from "@interfaces/movies";

const Browse = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<cardPreview[]>([])

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
  }, [])

  return (
    <section className={styles.browse}>
      <div className={styles.browse__content}>
        <div className={styles.browse__entry}>
          <Movie />
          <h1 className={styles.browse__title}>
            Popular in this <span>month</span>
          </h1>
        </div>
      </div>
      <div className={styles.browse__items}>
        {loading && <SkeletonCard listToRender={10} />}
        {data.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};
export default Browse;
