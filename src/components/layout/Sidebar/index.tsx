import Navigation from "../Navigation";
import styles from "./Sidebar.module.scss";

import Logo from "@components/ui/Logo";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
