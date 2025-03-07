import styles from "./Navigation.module.scss";

import BrowseICO from "@assets/images/icons/browse.svg?react";
import CalendarICO from "@assets/images/icons/calendar.svg?react";
import CategoryICO from "@assets/images/icons/category.svg?react";
import FavoriteICO from "@assets/images/icons/favorite.svg?react";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { Link } from "react-router";

const Navigation = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li className={styles.menu__item}>
          <Link to="/">
            <BrowseICO />
            <span>Browse</span>
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/categories">
            <CategoryICO />
            <span>Categories</span>
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/watchlist">
            <FavoriteICO />
            <span>Watchlist</span>
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/ratings">
            <RatingICO />
            <span>My Ratings</span>
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/soon">
            <CalendarICO />
            <span>Coming soon</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
