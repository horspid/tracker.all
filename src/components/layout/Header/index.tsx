import Search from "@components/ui/Search";
import styles from "./Header.module.scss";
import ControlPanel from "@components/layout/ControlPanel";
import { useState } from "react";

const Header = () => {
  const [currentValue, setCurrentValue] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navigation_control}>
        <Search
          name={"Search everything..."}
          onChange={onChangeHandler}
          value={currentValue}
        />
      </div>
      <ControlPanel />
    </header>
  );
};

export default Header;
