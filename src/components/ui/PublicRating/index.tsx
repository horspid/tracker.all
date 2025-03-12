import styles from "./PublicRating.module.scss";
import { ElementType } from "react";

interface PublicRatingProps {
  Icon: ElementType;
  rating: number;
}

const PublicRating = ({ Icon, rating }: PublicRatingProps) => {
  return (
    <div className={styles.public_rating__item}>
      <Icon />
      <span className={styles.public_rating__label}>{rating}</span>
    </div>
  );
};

export default PublicRating;
