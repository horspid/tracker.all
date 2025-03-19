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

  return (
    <article className={styles.product_card} onClick={navigateHandle}>
      <div className={styles.product_card__image}>
        <img
          src={data.poster.previewUrl ?? undefined}
          alt="card"
          className={styles.product_card__img}
        />
        {data.rating && (
          <div className={styles.product_card__rate}>
            <span>{data.rating.imdb}</span>
          </div>
        )}
      </div>
      <div className={styles.product_card__stats}>
        <h2 className={styles.product_card__title}>
          {data.name || data.alternativeName}
        </h2>
        <UserRating />
      </div>
    </article>
  );
};

export default ProductCard;
