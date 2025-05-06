import Sign from "@components/ui/Sign";
import Navigation from "./Navigation";

import Logo from "@components/ui/Logo";
import { useUserStore } from "@store/userStore";

import { NavLink } from "react-router";


const Sidebar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <aside className="flex flex-col h-fit min-w-260 bg-lightdark rounded-2xl relative gap-40 px-30 py-40">
      <Logo />
      <Navigation />

      <div className="h-1 w-full bg-grey"></div>

      {user && (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-white **:fill-red" : " text-grey"
          }
        >
          <Sign className={"out"} name="Выйти" isLoggedIn={true} />
        </NavLink>
      )}
      {!user && (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-white **:fill-red" : " text-grey"
          }
        >
          <Sign className={"in"} name="Войти" isLoggedIn={false} />
        </NavLink>
      )}
    </aside>
  );
};

export default Sidebar;
