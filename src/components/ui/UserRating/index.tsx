import { useEffect, useState } from "react";
import styles from "./UserRating.module.scss";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { fetchUserRatings, insertRatedMovie } from "@services/userRatings";
import { useUserStore } from "@store/userStore";
import { UserRatings } from "@interfaces/movies";

const user_rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface UserRatingProps {
  movieId: number;
}

const UserRating = ({ movieId }: UserRatingProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<UserRatings>();

  const userRatings = useUserStore((state) => state.userRatings);
  const setUserRatings = useUserStore((state) => state.setUserRatings);


  const onClickHandler = () => {
    setActive(!active);
  };

  const onClickRateHandler = async (rate: number, movieId: number) => {
    try {
      if (active) {
        await insertRatedMovie(rate, movieId);
        const result = await fetchUserRatings(); 

        if (!result) return setUserRatings([])
        
        setUserRatings(result.rated)
        setActive(false);
      }
    } catch (error) {
      setUserRatings(null)
      console.error(error);
    }
  };


  useEffect(() => {
    const userRate =
      userRatings && userRatings.find((item) => item.movie_id === movieId);

    if (userRate) {
      setUserRating(userRate);
    }
  }, [userRatings, movieId]);

  if (userRatings === null) {
    return <></>;
  }

  if (!userRating) {
    return (
      <div className={styles.rating} onClick={onClickHandler}>
        <RatingICO />
        {active &&
          user_rating.map((item, index) => (
            <p
              key={index}
              className={styles.rating__rate}
              onClick={() => onClickRateHandler(item, movieId)}
            >
              {item}
            </p>
          ))}
      </div>
    );
  }

  if (userRating) {
    return (
      <div className={styles.rating} onClick={onClickHandler}>
        <>
          <span className={styles.rating__value}>{userRating.user_rating}</span>
          <RatingICO className={styles.rating__ico} />
        </>
        {active &&
          user_rating.map((item, index) => (
            <p
              key={index}
              className={styles.rating__rate}
              onClick={() => onClickRateHandler(item, movieId)}
            >
              {item}
            </p>
          ))}
      </div>
    );
  }
};

export default UserRating;
