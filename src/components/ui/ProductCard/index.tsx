import { Movie } from "@interfaces/movies";
import styles from "./ProductCard.module.scss";
import UserRating from "@components/ui/UserRating";
import { useNavigate } from "react-router";


interface ProductCardProps {
  movie: Movie; 
}


const checkRateHandle = (rating: number) => {
  return rating === 0 ? null : rating.toFixed(1);
}


const ProductCard = ({ movie }: ProductCardProps) => {

  let navigate = useNavigate();
  const formattedRating = checkRateHandle(movie.vote_average)

  const navigateHandle = () => {
    navigate(`/movies/${movie.id}`)
  }
  

  return (
    <article className={styles.product_card} onClick={navigateHandle}>
      <div className={styles.product_card__image}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="card"
          className={styles.product_card__img}
        />
        {formattedRating && ( 
          <div className={styles.product_card__rate}>
            <span>{formattedRating}</span>
          </div>
        )}
      </div>
      <div className={styles.product_card__stats}>
        <h2 className={styles.product_card__title}>{movie.title}</h2>
        <UserRating />
      </div>
    </article>
  );
};

export default ProductCard;
