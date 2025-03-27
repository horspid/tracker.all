import Sign from "@components/ui/Sign";
import Navigation from "../Navigation";
import styles from "./Sidebar.module.scss";

import Logo from "@components/ui/Logo";
import { useUserStore } from "@store/userStore";

const Sidebar = () => {

  const session = useUserStore((state) => state.session)

  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Navigation />
      {session && <Sign className={'out'} name="Sign out" isLoggedIn={true}/>}
      {!session && <Sign className={'in'} name="Sign in" isLoggedIn={false}/>}
    </aside>
  );
};

export default Sidebar;
