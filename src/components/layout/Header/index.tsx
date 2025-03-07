import Search from "@components/ui/Search";
import styles from "./Header.module.scss";
import ControlPanel from "@components/layout/ControlPanel";

const Header = () => {
  return (
    <header className={styles.header}>
      <Search />
      <ControlPanel />
    </header>
  );
};

export default Header;
