import styles from "./UserRating.module.scss";
import RatingICO from "@assets/images/icons/rating.svg?react";

const UserRating = () => {

  return (
    <div className={styles.user_rating}>
      <RatingICO />
    </div>
  );
};

export default UserRating;
