import { useEffect, useState } from 'react';
import styles from './Ratings.module.scss'
import RatingsICO from "@assets/images/icons/rating.svg?react";
import { useUserStore } from '@store/userStore';
import ProductCard from '@components/ui/ProductCard';
import { fetchUserRatings } from '@services/userRatings';
import { cardPreview } from '@interfaces/movies';


const Ratings = () => {

  const [loading, setLoading] = useState(true);
  const [userRated, setUserRated] = useState<cardPreview[] | null>([])

  useEffect(() => {
    const init = async () => {
      const result = await fetchUserRatings();
      if (result) {
        setUserRated(result)
        setLoading(false)
      }
    }

    init();
  }, [])

  if (loading) {
    return <div className={styles.profile}>Loading...</div>;
  }

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
          userRated.map((item) => (
            <ProductCard key={item.id} data={item}/>
          ))
        ) : (
          <p>Нет добавленных фильмов в списке.</p>
        )}
      </div>
    </section>
  );
};

export default Ratings;
