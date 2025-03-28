import { useParams } from "react-router";
import styles from "./Profile.module.scss";
import { isUserProfile } from "@services/userAuth";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";


const Profile = () => {

  const { id } = useParams<string>()
  const otherUser = useUserStore((state) => state.otherUser);
  const user = useUserStore((state) => state.user);


  useEffect(() => {
    if (!id) return;
    isUserProfile(id);
  }, [id]);

  const renderAvatar = () => {
    if (otherUser && otherUser.avatar_url) {
      return <ProfileAvatar avatarUrl={otherUser.avatar_url} />;
    }

    if (user && user.avatar_url) {
      return <ProfileAvatar avatarUrl={user.avatar_url} />;
    }

    return <ProfileAvatar />;
  };

  return (
    <section className={styles.profile}>
      <h1 className={styles.profile__title}>{otherUser ? otherUser.login : user.login}</h1>
      <div className={styles.profile__info}>
        <div className={styles.profile__avatar}>
          {renderAvatar()}
        </div>
      </div>
    </section>
  )
};

export default Profile;
