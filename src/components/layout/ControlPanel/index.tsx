import styles from "./ControlPanel.module.scss";
import BookmarkICO from "@assets/images/icons/bookmark.svg?react";
import NotificationICO from "@assets/images/icons/notification.svg?react";
import ProfileICO from "@assets/images/icons/profile.svg?react";
import { DatabaseUser } from "@interfaces/user";
import { useUserStore } from "@store/userStore";
import { useNavigate } from "react-router";

const ControlPanel = () => {
  const navigate = useNavigate();

  const user: DatabaseUser = useUserStore((state) => state.user);

  const onProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.login}`);
    } else {
      navigate(`/login`);
    }
  };


  return (
    <section className={styles.user_control}>
      <button className={styles.user_control__item}>
        <BookmarkICO />
      </button>
      <button className={styles.user_control__item}>
        <NotificationICO />
      </button>
      <button
        className={styles.user_control__item}
        onClick={() => onProfileClick()}
      >
          <ProfileICO />
      </button>
    </section>
  );
};

export default ControlPanel;
