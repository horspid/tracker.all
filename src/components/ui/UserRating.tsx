import { useEffect, useState } from "react";
import StarICO from "@assets/images/icons/star.svg?react";
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

  const user = useUserStore((state) => state.user);
  const userRatings = useUserStore((state) => state.userRatings);
  const setUserRatings = useUserStore((state) => state.setUserRatings);

  const onClickHandler = () => {
    setActive(!active);
  };

  const onClickRateHandler = async (rate: number, movieId: number) => {
    try {
      if (!active) return;

      await insertRatedMovie(rate, movieId);
      const result = await fetchUserRatings();

      if (!result) return setUserRatings([]);

      setUserRatings(result.rated);
      setActive(false);
    } catch (error) {
      setUserRatings(null);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userRatings) return;

    const userRate =
      userRatings && userRatings.find((item) => item.movie_id === movieId);

    if (userRate) {
      setUserRating(userRate);
    }
  }, [userRatings, movieId]);

  if (!user) return null;

  console.log(userRating);

  return (
    <button
      className={`flex items-center gap-10 py-13 px-16 cursor-pointer bg-lightdark rounded-xl justify-center`}
      onClick={onClickHandler}
    >
      <div className="flex items-center gap-10">
        <StarICO className={`${userRating ? "star-active" : "star-disable"}`} />
        {userRating && (
          <span className="rating__value">{userRating.user_rating}</span>
        )}
      </div>
      {active && (
        <div className="flex gap-20 ml-10">
          {user_rating.map((item, index) => (
            <p
              key={index}
              className="hover:text-red"
              onClick={() => onClickRateHandler(item, movieId)}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </button>
  );
};

export default UserRating;
