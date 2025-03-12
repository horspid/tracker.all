import Search from "@components/ui/Search";
import styles from "./Header.module.scss";
import ControlPanel from "@components/layout/ControlPanel";
import MediaSwitcher from "@components/ui/MediaSwitcher";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navigation_control}>
        <Search />
        <MediaSwitcher />
      </div>
      <ControlPanel />
    </header>
  );
};

export default Header;
