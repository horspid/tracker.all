import styles from "./ProductCard.module.scss";

import KinopoiskICO from "@assets/images/icons/kinopoisk.svg?react";
import PublicRating from "@components/ui/PublicRating";
import ImdbICO from "@assets/images/icons/imdb.svg?react";
import UserRating from "@components/ui/UserRating";

const publicRating = [
  { icon: KinopoiskICO, rating: 3.4 },
  { icon: ImdbICO, rating: 8.9 },
];

const ProductCard = ({ movie, hasRating, userRating }) => {
  return (
    <article className={styles.product_card}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="card"
        className={styles.product_card__img}
      />
      <h2 className={styles.product_card__title}>{movie.title}</h2>
      <div className={styles.product_card__stats}>
        <div className={styles.product_card__public}>
          {publicRating.map((item, index) => (
            <PublicRating Icon={item.icon} rating={item.rating} key={index} />
          ))}
        </div>
        <UserRating hasRating={hasRating} userRating={userRating} />
      </div>
    </article>
  );
};

export default ProductCard;
