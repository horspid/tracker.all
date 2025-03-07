import styles from "./ControlPanel.module.scss";

import BookmarkICO from "@assets/images/icons/bookmark.svg?react";
import NotificationICO from "@assets/images/icons/notification.svg?react";
import ProfileICO from "@assets/images/icons/profile.svg?react";

const ControlPanel = () => {
  return (
    <section className={styles.control}>
      <button className={styles.control__item}>
        <BookmarkICO />
      </button>
      <button className={styles.control__item}>
        <NotificationICO />
      </button>
      <button className={styles.control__item}>
        <ProfileICO />
      </button>
    </section>
  );
};

export default ControlPanel;
