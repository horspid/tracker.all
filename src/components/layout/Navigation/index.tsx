import BrowseICO from "@assets/images/icons/browse.svg?react";
import CalendarICO from "@assets/images/icons/calendar.svg?react";
import CategoryICO from "@assets/images/icons/category.svg?react";
import FavoriteICO from "@assets/images/icons/favorite.svg?react";
import RatingICO from "@assets/images/icons/rating.svg?react";
import { useUserStore } from "@store/userStore";
import { NavLink } from "react-router";

import "./Navigation.css";

const menuItems = [
  {
    link: "/",
    name: "Обзор",
    iconClassName: "ico__browse",
    Icon: BrowseICO,
  },
  {
    link: "/categories",
    name: "Категории",
    iconClassName: "ico__category",
    Icon: CategoryICO,
  },
  {
    link: "/watchlist",
    name: "Буду смотреть",
    iconClassName: "ico__favorite",
    Icon: FavoriteICO,
  },
  {
    link: "/ratings",
    name: "Оценки",
    iconClassName: "ico__rating",
    Icon: RatingICO,
  },
  {
    link: "/soon",
    name: "Скоро",
    iconClassName: "ico__calendar",
    Icon: CalendarICO,
  },
];

const Navigation = () => {
  const user = useUserStore((state) => state.user);

  return (
    <nav>
      <ul>
        {menuItems.map(({ link, name, iconClassName, Icon }, index) => {
          if (!user && (link === "/watchlist" || link === "/ratings")) {
            return null;
          }

          return (
            <li className="pt-20 first:p-0" key={index}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-start gap-10 text-white ico__active"
                    : "flex items-start gap-10 text-grey"
                }
              >
                <Icon className={iconClassName} />
                <span className="text-xl font-semibold">{name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
