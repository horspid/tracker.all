import styles from "./ControlPanel.module.scss";

import BookmarkICO from "@assets/images/icons/bookmark.svg?react";
import NotificationICO from "@assets/images/icons/notification.svg?react";
import ProfileICO from "@assets/images/icons/profile.svg?react";

const ControlPanel = () => {
  return (
    <section className={styles.user_control}>
      <button className={styles.user_control__item}>
        <BookmarkICO />
      </button>
      <button className={styles.user_control__item}>
        <NotificationICO />
      </button>
      <button className={styles.user_control__item}>
        <ProfileICO />
      </button>
    </section>
  );
};

export default ControlPanel;
