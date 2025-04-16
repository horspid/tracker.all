import styles from "./Navigation.module.scss";
import BrowseICO from "@assets/images/icons/browse.svg?react";
import CalendarICO from "@assets/images/icons/calendar.svg?react";
import CategoryICO from "@assets/images/icons/category.svg?react";
import FavoriteICO from "@assets/images/icons/favorite.svg?react";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { useUserStore } from "@store/userStore";
import { NavLink } from "react-router";

const menuItems = [
  {
    link: "/",
    name: "Browse",
    iconClassName: styles.ico__browse,
    Icon: BrowseICO,
  },
  {
    link: "/categories",
    name: "Category",
    iconClassName: styles.ico__category,
    Icon: CategoryICO,
  },
  {
    link: "/watchlist",
    name: "Watchlist",
    iconClassName: styles.ico__favorite,
    Icon: FavoriteICO,
  },
  {
    link: "/ratings",
    name: "Ratings",
    iconClassName: styles.ico__rating,
    Icon: RatingICO,
  },
  {
    link: "/soon",
    name: "Soon",
    iconClassName: styles.ico__calendar,
    Icon: CalendarICO,
  },
];

const Navigation = () => {
  const user = useUserStore((state) => state.user);

  return (
    <nav className={styles.menu}>
      <ul>
        {menuItems.map(({ link, name, iconClassName, Icon }, index) => {
          
          if (!user && (link === "/watchlist" || link === "/ratings")) {
            return null;
          }

          return (
            <li className={styles.menu__item} key={index}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  isActive ? styles.menu__item_active : ""
                }
              >
                <Icon className={iconClassName} />
                <span>{name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
