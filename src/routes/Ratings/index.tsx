import { useEffect, useState } from "react";
import styles from "./Ratings.module.scss";
import RatingsICO from "@assets/images/icons/rating.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { fetchUserRatings } from "@services/userRatings";
import { cardPreview } from "@interfaces/movies";
import { useUserStore } from "@store/userStore.ts";
import { useNavigate } from "react-router";
import SkeletonCard from "@components/ui/SkeletonCard";

const Ratings = () => {
  const [loading, setLoading] = useState(true);
  const [userRated, setUserRated] = useState<cardPreview[] | null>([]);
  const { userRatings } = useUserStore.getState();

  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      const result = await fetchUserRatings();
      setUserRated(result);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className={styles.ratings}>
        <div className={styles.ratings__items}>
          <SkeletonCard listToRender={4}/> 
        </div>
      </div>
    )
  }

  if (userRatings === null) {
    navigate(`/login`)
    return null
  }

  if (userRatings.length === 0) {
    return (
      <section className={styles.ratings_error}>
        <h1 className={styles.ratings_error__title}>
          Пока-что вы не оценили ни один фильм / сериал :)
        </h1>
      </section>
    );
  }

  if (userRatings.length > 0) {
    return (
      <section className={styles.ratings}>
        <div className={styles.ratings__heading}>
          <div className={styles.ratings__entry}>
            <RatingsICO className={styles.ico__ratings} />
            <h1 className={styles.ratings__title}>Ratings</h1>
          </div>
        </div>
        <div className={styles.ratings__items}>
          {userRated && userRated.length > 0 ? (
            userRated.map((item) => <ProductCard key={item.id} data={item} />)
          ) : (
            <p>Нет добавленных фильмов в списке.</p>
          )}
        </div>
      </section>
    );
  }
};

export default Ratings;
