import { useParams } from "react-router";
import styles from "./Profile.module.scss";
import { findUserInDatabase, isUserPage } from "@services/userAuth";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";


const Profile = () => {

  const { login } = useParams<string>()

  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true)
  
  useEffect(() => {
    if (!login) return;

    const findUser = async () => {
      const result = await findUserInDatabase(login);
      if (result) return setUserProfile(result);
    }


    const checkUser = async () => {
      const result = await isUserPage(login)
      result ? setIsCurrentUser(result) : setIsCurrentUser(false)
    }

    findUser()
    checkUser()

  }, [login]);

  const renderAvatar = () => {
    if (userProfile) {
      return <ProfileAvatar avatarUrl={userProfile.avatar_url} />;
    }

    return <ProfileAvatar />;
  };

  console.log(isCurrentUser)

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
