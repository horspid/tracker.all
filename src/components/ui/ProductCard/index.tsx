import styles from "./ProductCard.module.scss";
import UserRating from "@components/ui/UserRating";
import { useNavigate } from "react-router";
import { cardPreview } from "@interfaces/movies.ts";

interface ProductCardProps {
  data: cardPreview;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate(`/movies/${data.id}`);
  };

  const parsedRatingKp = data.rating && data.rating.kp?.toFixed(1);

  const viewImage = () => {
    if (data.poster.previewUrl) {
      return (
        <img
          src={data.poster.previewUrl || ""}
          alt="card"
          className={styles.product_card__img}
        />
      );
    } else return <div className={styles.product_card__skeleton}></div>;
  };

  return (
    <article className={styles.product_card} onClick={navigateHandle}>
      <div className={styles.product_card__image}>
        {viewImage()}
        {data.rating && (
          <div className={styles.product_card__rate}>
            <span>
              {data.rating.imdb !== 0 ? data.rating.imdb : parsedRatingKp}
            </span>
          </div>
        )}
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
