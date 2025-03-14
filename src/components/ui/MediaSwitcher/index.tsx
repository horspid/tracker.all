import styles from "./MediaSwitcher.module.scss";
import { useState } from "react";

const media = ["films", "serials"];

const MediaSwitcher = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <div className={styles.media_switcher}>
      {media.map((item, index) => (
        <button
          className={`${styles.media_switcher__item} ${index === active ? styles.active : ""}`}
          key={index}
          onClick={() => setActive(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default MediaSwitcher;
