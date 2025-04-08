import ProductCard from "@components/ui/ProductCard";
import styles from "./Watchlist.module.scss";
import WatchlistICO from "@assets/images/icons/favorite.svg?react";

import { cardPreview } from "@interfaces/movies";
import { fetchMovie } from "@services/userFavorites";
import { useEffect, useState } from "react";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<cardPreview[] | null>([]);

  useEffect(() => {
    const init = async () => {
      const result = await fetchMovie();

      setWatchlist(result);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  if (watchlist === null) {
    return (
      <section className={styles.ratings_error}>
        <h1 className={styles.ratings_error__title}>
          Что-бы смотреть watchlist, необходимо авторизоваться :)
        </h1>
      </section>
    );
  }

  if (watchlist.length === 0) {
    return (
      <section className={styles.ratings_error}>
        <h1 className={styles.ratings_error__title}>
          Пока-что вы не добавили ни один фильм / сериал :)
        </h1>
      </section>
    );
  }

  return (
    <section className={styles.watchlist}>
      <div className={styles.watchlist__content}>
        <div className={styles.watchlist__entry}>
          <WatchlistICO className={styles.ico__watchlist} />
          <h1 className={styles.watchlist__title}>Watchlist</h1>
        </div>
      </div>
      <div className={styles.watchlist__items}>
        {watchlist && watchlist.length > 0 ? (
          watchlist.map((item) => <ProductCard key={item.id} data={item} />)
        ) : (
          <p>Нет добавленных фильмов в списке.</p>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
