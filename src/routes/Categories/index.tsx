import styles from "@routes/Categories/Categories.module.scss";
import CategoryICO from "@assets/images/icons/category.svg?react";
import CategoryCard from "@components/ui/CategoryCard";

import filmImage from "@assets/images/films.jpg";
import serialImage from "@assets/images/serials.jpg";
import animeImage from "@assets/images/anime.jpg";
import cartoonImage from "@assets/images/cartoon.jpg";
import animatedSeriesImage from "@assets/images/animated-series.jpg";

const Categories = () => {
  const movies = [
    {
      name: "films",
      nameUrl: "movie",
      src: filmImage,
    },
    {
      name: "tv series",
      nameUrl: "tv-series",
      src: serialImage,
    },
    {
      name: "anime",
      nameUrl: "anime",
      src: animeImage,
    },
    {
      name: "cartoon",
      nameUrl: "cartoon",

      src: cartoonImage,
    },
    {
      name: "animated series",
      nameUrl: "animated-series",
      src: animatedSeriesImage,
    },
  ];

  return (
    <section className={styles.categories}>
      <div className={styles.categories__content}>
        <div className={styles.categories__entry}>
          <CategoryICO className={styles.ico__category} />
          <h1 className={styles.categories__title}>Categories</h1>
        </div>
      </div>
      <div className={styles.categories__items}>
        {movies.map((item, index) => (
          <CategoryCard data={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
