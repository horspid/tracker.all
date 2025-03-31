import { useParams } from "react-router";
import styles from "./Profile.module.scss";
import { findUserInDatabase } from "@services/userAuth";
import { useEffect } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";


const Profile = () => {

  const { id } = useParams<string>()

  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);



  useEffect(() => {
    if (!id) return;

    const findUser = async () => {
      const result = await findUserInDatabase(id);
      if (result) return setUserProfile(result)
    }

    findUser()
  }, [id]);

  const renderAvatar = () => {
    if (userProfile) {
      return <ProfileAvatar avatarUrl={userProfile.avatar_url} />;
    }

    return <ProfileAvatar />;
  };

  return (
    <section className={styles.profile}>
      <h1 className={styles.profile__title}>{userProfile && userProfile.login}</h1>
      <div className={styles.profile__info}>
        <div className={styles.profile__avatar}>
          {renderAvatar()}
        </div>
      </div>
    </section>
  )
};

export default Profile;
