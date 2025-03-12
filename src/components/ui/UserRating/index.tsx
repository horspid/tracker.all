import styles from "./UserRating.module.scss";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { UserRatingProps } from "@interfaces/card";
import { useEffect, useState } from "react";

const UserRating = ({ hasRating, userRating }: UserRatingProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (hasRating) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [hasRating]);

  return (
    <div className={styles.user_rating}>
      <RatingICO className={isActive ? styles.user_rating__ico_active : ""} />
      {hasRating && (
        <div className={styles.user_rating__label}>{userRating}</div>
      )}
    </div>
  );
};

export default UserRating;
