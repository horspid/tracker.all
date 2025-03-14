import styles from "./UserRating.module.scss";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { useEffect, useState } from "react";

const UserRating = () => {
  const [isActive, setIsActive] = useState(false);


  return (
    <div className={styles.user_rating}>
      <RatingICO className={isActive ? styles.user_rating__ico_active : ""} />
      {/* {hasRating && (
        <div className={styles.user_rating__label}>{userRating}</div>
      )} */}
    </div>
  );
};

export default UserRating;
