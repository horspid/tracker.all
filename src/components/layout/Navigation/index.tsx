import BrowseICO from "@assets/images/icons/browse.svg?react";
import CalendarICO from "@assets/images/icons/calendar.svg?react";
import CategoryICO from "@assets/images/icons/category.svg?react";
import FavoriteICO from "@assets/images/icons/favorite.svg?react";
import StarICO from "@assets/images/icons/star.svg?react";
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
    name: "Избранное",
    iconClassName: "ico__favorite",
    Icon: FavoriteICO,
  },
  {
    link: "/ratings",
    name: "Оценки",
    iconClassName: "ico__rating",
    Icon: StarICO,
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
                    ? "flex items-center gap-10 text-white ico__active"
                    : "flex items-center gap-10 text-grey"
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
