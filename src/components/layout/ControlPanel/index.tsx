import styles from "./ControlPanel.module.scss";
import BookmarkICO from "@assets/images/icons/bookmark.svg?react";
import NotificationICO from "@assets/images/icons/notification.svg?react";
import ProfileICO from "@assets/images/icons/profile.svg?react";
import { findUserInDatabase } from "@services/userAuth";
import { useUserStore } from "@store/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ControlPanel = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);


  const onProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.user_metadata.login}`);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    const parseAvatar = async () => {
      if (user) {
        const result = await findUserInDatabase(user?.user_metadata.login);
  
        if (result && result.avatar_url) {
          setAvatarUrl(result.avatar_url)
        }
      }
    }
    parseAvatar();
  }, [findUserInDatabase])


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
          {avatarUrl ? (
            <div className={styles.user__avatar}>
              <img src={avatarUrl} alt="user" />
            </div>
          ) : <ProfileICO />}
      </button>
    </section>
  );
};

export default ControlPanel;
