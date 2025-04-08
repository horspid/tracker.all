import styles from "./ProductCard.module.scss";
import { useNavigate } from "react-router";
import { cardPreview } from "@interfaces/movies.ts";
import { useUserStore } from "@store/userStore";

interface ProductCardProps {
  data: cardPreview;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const ratings = useUserStore((state) => state.userRatings);
  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate(`/movies/${data.id}`);
  };

  const userRate = ratings && ratings.find((item) => item.movie_id === data.id);

  const viewImage = () => {
    if (data.poster && data.poster.previewUrl) {
      return (
        <img
          src={data.poster.previewUrl || ""}
          alt="card"
          className={styles.product_card__img}
        />
      );
    } else return <div className={styles.product_card__skeleton}></div>;
  };

  const checkRating = () => {
    if (userRate && userRate.user_rating) {
      return (
        <div className={styles.product_card__rate}>
          <span>{userRate.user_rating}</span>
        </div>
      );
    } else if (data.rating) {      
      if (data.rating.kp !== 0 || data.rating.imdb !== 0) {
        return (
          <div className={styles.product_card__rate}>
            <span>{data.rating.kp && data.rating.kp.toFixed(1) || data.rating.imdb}</span>
          </div>
        );
      }
    }
    
    return null;
  };

  return (
    <article className={styles.product_card} onClick={navigateHandle}>
      <div className={styles.product_card__image}>
        {viewImage()}
        {checkRating()}
      </div>
      <div className={styles.product_card__stats}>
        <h2 className={styles.product_card__title}>
          {data.name || data.alternativeName}
        </h2>
      </div>
    </article>
  );
};

export default ProductCard;
