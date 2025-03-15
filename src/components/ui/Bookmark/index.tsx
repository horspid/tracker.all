import { useState } from "react";
import Bookmark2ICO from "@assets/images/icons/bookmark2.svg?react";
import styles from "./Bookmark.module.scss";

const Bookmark = () => {
  const [active, setActive] = useState(false);

  const onClickHandler = () => {
    return active ? setActive(!active) : setActive(true);
  };

  return (
    <div className={styles.btn__bookmark}>
      <button className={active ? styles.active : ""} onClick={onClickHandler}>
        <Bookmark2ICO />
      </button>
      {active ? <h2>Remove from Watchlist</h2> : <h2>Add from Watchlist</h2>}
    </div>
  );
};

export default Bookmark;
