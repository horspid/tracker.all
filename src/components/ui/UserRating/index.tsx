import { useEffect, useState } from "react";
import styles from "./UserRating.module.scss";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { fetchUserRatings, insertRatedMovie } from "@services/userRatings";
import { useUserStore } from "@store/userStore";
import { UserRatings } from "@interfaces/movies";

const user_rating = [1,2,3,4,5,6,7,8,9,10]

interface UserRatingProps {
  movieId: number;
}

const UserRating = ({ movieId }: UserRatingProps) => {

  const [active, setActive] = useState<boolean>(false)
  const [isUserHaveRate, setIsUserHaveRate] = useState<boolean>(false)
  const [userRating, setUserRating] = useState<UserRatings>()

  const ratings = useUserStore((state) => state.userRatings);

  const onClickHandler = () => {
    setActive(!active)
    console.log(active)
  }

  const onClickRateHandler = async (rate: number, movieId: number) => {
    try {
      if (active) {

        await insertRatedMovie(rate, movieId)
        await fetchUserRatings();

        setActive(false)
      }
    } catch (error) {
      console.log(error)
      setIsUserHaveRate(false)
    }
  }

  useEffect(() => {
    const userRate = ratings.find((item) => item.movie_id === movieId)
    if (userRate){ 
      setUserRating(userRate)
      setIsUserHaveRate(true)
    }
  }, [ratings, movieId])

  return (
    <div className={styles.rating} onClick={onClickHandler}>
      {isUserHaveRate ? (
        userRating &&      
        <>
          <span className={styles.rating__value}>{userRating.user_rating}</span>
          <RatingICO className={styles.rating__ico}/>
        </>
      ) : <RatingICO />}
      {active && user_rating.map((item, index) => <p key={index} className={styles.rating__rate} onClick={() => onClickRateHandler(item, movieId)}>{item}</p>)}
    </div>
  );
};

export default UserRating;
