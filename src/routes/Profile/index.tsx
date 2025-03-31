import { useParams } from "react-router";
import styles from "./Profile.module.scss";
import { findUserInDatabase, isUserPage } from "@services/userAuth";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";

const Profile = () => {
  const { login } = useParams<string>();

  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!login) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        const [profile, isUser] = await Promise.all([
          findUserInDatabase(login),
          isUserPage(login),
        ]);

        if (profile) {
          setUserProfile(profile);
        }
        setIsCurrentUser(isUser);
      } catch (error) {
        console.error("Пользователь не найден", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [login, setUserProfile]);

  const renderAvatar = () => {
    if (userProfile) {
      return <ProfileAvatar avatarUrl={userProfile.avatar_url} />;
    }

    return <ProfileAvatar />;
  };

  if (isLoading) {
    return <div className={styles.profile}>Loading...</div>;
  }

  return (
    <section className={styles.profile}>
      <h1 className={styles.profile__title}>
        {userProfile && userProfile.login}
      </h1>
      <div className={styles.profile__info}>
        <div className={styles.profile__avatar}>{renderAvatar()}</div>
      </div>
    </section>
  );
};

export default Profile;
