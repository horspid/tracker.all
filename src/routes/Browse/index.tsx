import styles from "./Browse.module.scss";
import Movie from "@assets/images/icons/movie.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";

import { useMovieStore } from "../../store/popularFilmes.ts";

const Browse = () => {
  const { data, getData } = useMovieStore();
  const [popularDate, setPopularDate] = useState<string>('day');

  const popularChangeHandler = () => {
    setPopularDate(popularDate === 'day' ? 'week' : 'day')  
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className={styles.browse}>
      <div className={styles.browse__content}>
        <div className={styles.browse__entry}>
          <Movie />
          <h1 className={styles.browse__title}>Popular in this <span onClick={popularChangeHandler}>{popularDate}</span></h1>
        </div>
      </div>
      <div className={styles.browse__items}>
        {data.map((item) => (
          <ProductCard
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </section>
  );
};

export default Browse;
