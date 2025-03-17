import styles from "./ProductCard.module.scss";
import UserRating from "@components/ui/UserRating";
import { MoviePreview } from "@interfaces/movies";
import { useNavigate } from "react-router";

interface ProductCardProps {
  data: MoviePreview;
}

const ProductCard = ({ data }: ProductCardProps) => {

  let navigate = useNavigate();

  const navigateHandle = () => {
    navigate(`/movies/${data.id}`)
  }
  

  return (
    <article className={styles.product_card} onClick={navigateHandle}>
      <div className={styles.product_card__image}>
        <img
          src={data.poster.previewUrl}
          alt="card"
          className={styles.product_card__img}
        />
          {data.rating && (
            <div className={styles.product_card__rate}>
              <span>{data.rating?.imdb}</span>
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
