import styles from "./Browse.module.scss";
import Movie from "@assets/images/icons/movie.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";

import { useMovieStore } from "../../store/popularFilmes.ts";

const Browse = () => {
  const { films, getFilms } = useMovieStore();


  const [popularDate, setPopularDate] = useState('day');
  // ДОБАВИТЬ ОБРАБОТЧИК СОБЫТИЯ ONPAGE, ПЕРЕДАВАТЬ В STORE ЗАПРОС

  const popularChangeHandler = () => {
    setPopularDate(popularDate === 'day' ? 'week' : 'day')  
  }

  useEffect(() => {
    getFilms(popularDate);
  }, [getFilms, popularDate]);

  return (
    <section className={styles.browse}>
      <div className={styles.browse__content}>
        <div className={styles.browse__entry}>
          <Movie />
          <h1 className={styles.browse__title}>Popular in this <span onClick={popularChangeHandler}>{popularDate}</span></h1>
        </div>
      </div>
      <div className={styles.browse__items}>
        {films.map((item) => (
          <ProductCard
            hasRating={true}
            userRating={7}
            key={item.id}
            movie={item}
          />
        ))}
      </div>
    </section>
  );
};

export default Browse;
