import styles from "./Browse.module.scss";
import Movie from "@assets/images/icons/movie.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";

import { useMovieStore } from "../../store/popularFilmes.ts";

const Browse = () => {
  const { films, getFilms } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(1);

  // ДОБАВИТЬ ОБРАБОТЧИК СОБЫТИЯ ONPAGE, ПЕРЕДАВАТЬ В STORE ЗАПРОС

  const onPageChangeHandler = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    getFilms(currentPage);
  }, [getFilms, currentPage]);

  return (
    <section className={styles.browse}>
      <div className={styles.browse__content}>
        <div className={styles.browse__entry}>
          <Movie />
          <h1 className={styles.browse__title}>Popular</h1>
          {/*<ReactPaginate*/}
          {/*  className={styles.browse__pagination}*/}
          {/*  onPageChange={onPageChangeHandler}*/}
          {/*  pageCount={5}*/}
          {/*  previousClassName={styles.browse__pagination_previous}*/}
          {/*  nextClassName={styles.browse__pagination_next}*/}
          {/*  previousLabel={<Arrow className={styles.browse_left_arrow} />}*/}
          {/*  nextLabel={<Arrow className={styles.browse__right_arrow} />}*/}
          {/*  pageClassName={styles.browse__pagination_page}*/}
          {/*/>*/}
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
