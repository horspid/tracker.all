import { useParams } from "react-router";
import { findUserInDatabase } from "@services/userAuth";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import SkeletonProfile from "@components/ui/SkeletonProfile";

const Profile = () => {
  const { login } = useParams<string>();

  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const user = useUserStore((state) => state.user);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {}, [user, login]);

  useEffect(() => {
    if (!login) return;

    if (user) {
      setIsCurrentUser(login === user.user_metadata.login);
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const result = await findUserInDatabase(login, isCurrentUser);

        if (result) {
          setUserProfile(result.user);
        }
      } catch (error) {
        throw new Error("Ошибка при обработке профиля пользователя" + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [login, setUserProfile, user, isCurrentUser]);

  if (isLoading || !userProfile)
    return <SkeletonProfile isCurrentUser={isCurrentUser} />;

  return (
    <section className="section-container">
      <div className="grid grid-cols-3 grid-rows-2 gap-40 text-white font-bold">
        <div className="flex flex-col row-span-full gap-20 bg-lightdark px-20 py-40 rounded-2xl items-center justify-center shadow-lg shadow-grey/10">
          <h1 className="text-4xl truncate w-full text-center">
            {userProfile.login}
          </h1>
          <ProfileAvatar
            avatarUrl={userProfile.avatar_url}
            isCurrentUser={isCurrentUser}
          />
        </div>
        <div className="flex flex-col row-start-1 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center text-2xl shadow-lg shadow-grey/10">
          <span>Фильмы</span>
          <span className="text-red">{userProfile.total_movies}</span>
        </div>
        <div className="flex flex-col row-start-2 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center text-2xl shadow-lg shadow-grey/10">
          <span>Сериалы</span>
          <span className="text-red">{userProfile.total_movies}</span>
        </div>
        {isCurrentUser && (
          <button className="bg-red px-20 py-40 rounded-2xl text-2xl cursor-pointer shadow-lg shadow-grey/10">
            Экспорт просмотров
          </button>
        )}
        {isCurrentUser && (
          <button className="bg-red px-20 py-40 rounded-2xl text-2xl cursor-pointer shadow-lg shadow-grey/10">
            Настройки
          </button>
        )}
      </div>
    </section>
  );
};

export default Profile;
