import styles from "./Navigation.module.scss";

import BrowseICO from "@assets/images/icons/browse.svg?react";
import CalendarICO from "@assets/images/icons/calendar.svg?react";
import CategoryICO from "@assets/images/icons/category.svg?react";
import FavoriteICO from "@assets/images/icons/favorite.svg?react";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li className={styles.menu__item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.menu__item_active : ""
            }
          >
            <BrowseICO className={styles.ico__browse} />
            <span>Browse</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? styles.menu__item_active : ""
            }
          >
            <CategoryICO className={styles.ico__category} />
            <span>Categories</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? styles.menu__item_active : ""
            }
          >
            <FavoriteICO className={styles.ico__favorite} />
            <span>Watchlist</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/ratings"
            className={({ isActive }) =>
              isActive ? styles.menu__item_active : ""
            }
          >
            <RatingICO className={styles.ico__rating} />
            <span>My Ratings</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/soon"
            className={({ isActive }) =>
              isActive ? styles.menu__item_active : ""
            }
          >
            <CalendarICO className={styles.ico__calendar} />
            <span>Coming soon</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
