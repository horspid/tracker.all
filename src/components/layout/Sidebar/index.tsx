import Sign from "@components/ui/Sign";
import Navigation from "../Navigation";
import styles from "./Sidebar.module.scss";

import Logo from "@components/ui/Logo";
import { useUserStore } from "@store/userStore";

const Sidebar = () => {

  const user = useUserStore((state) => state.user)

  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Navigation />
      {user && <Sign className={'out'} name="Sign out" isLoggedIn={true}/>}
      {!user && <Sign className={'in'} name="Sign in" isLoggedIn={false}/>}
    </aside>
  );
};

export default Sidebar;
