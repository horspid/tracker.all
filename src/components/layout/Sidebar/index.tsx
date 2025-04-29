// import Sign from "@components/ui/Sign";
import Navigation from "../Navigation";

import Logo from "@components/ui/Logo";
// import { useUserStore } from "@store/userStore";

const Sidebar = () => {
  // const user = useUserStore((state) => state.user);

  return (
    <aside className="flex flex-col flex-1/6 bg-lightdark rounded-2xl relative gap-50 p-30">
      <Logo />
      <Navigation />
      {/* {user && <Sign className={"out"} name="Выйти" isLoggedIn={true} />}
      {!user && <Sign className={"in"} name="Войти" isLoggedIn={false} />} */}
    </aside>
  );
};

export default Sidebar;
