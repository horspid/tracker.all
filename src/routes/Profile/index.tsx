import { useParams } from "react-router";
import styles from "./Profile.module.scss";
import { findUserInDatabase } from "@services/userAuth";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import Loading from "@components/ui/Loading";

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

        const result = await findUserInDatabase(login);

        if (result) {
          setUserProfile(result.user);
          setIsCurrentUser(result.isUserPage);
        }
      } catch (error) {
        throw new Error("Ошибка при обработке профиля пользователя" + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [login, setUserProfile]);

  if (isLoading) {
    return (
      <div className={styles.profile}>
        <Loading />
      </div>
    );
  }

  return (
    <section className={styles.profile}>
      {userProfile && (
        <>
          <h1 className={styles.profile__title}>{userProfile.login}</h1>
          <div className={styles.profile__info}>
            <div className={styles.profile__avatar}>
              <ProfileAvatar
                avatarUrl={userProfile.avatar_url}
                isCurrentUser={isCurrentUser}
              />
            </div>
            <div className={styles.profile__watched}>
              <div className={styles.profile__watched_item}>
                <button className={styles.profile__button}>Watched</button>
                <p className={styles.profile__count}>
                  {userProfile.total_movies}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
