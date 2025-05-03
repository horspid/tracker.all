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

  if (isLoading || !userProfile) return <SkeletonProfile />;

  return (
    <section className="section-container">
      <div className="grid grid-cols-3 grid-rows-2 gap-40 text-white font-bold">
        <div className="flex flex-col row-span-full gap-20 bg-lightdark px-20 py-40 rounded-2xl items-center justify-center">
          <h1 className="text-4xl truncate w-full text-center">
            {userProfile.login}
          </h1>
          <ProfileAvatar
            avatarUrl={userProfile.avatar_url}
            isCurrentUser={isCurrentUser}
          />
        </div>
        <div className="flex flex-col row-start-1 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center text-2xl">
          <span>Фильмы</span>
          <span className="text-red">{userProfile.total_movies}</span>
        </div>
        <div className="flex flex-col row-start-2 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center text-2xl">
          <span>Сериалы</span>
          <span className="text-red">{userProfile.total_movies}</span>
        </div>
        <button className="bg-red w-full px-20 py-40 rounded-2xl text-2xl cursor-pointer">
          Экспорт просмотров
        </button>
        <button className="bg-red px-20 py-40 rounded-2xl text-2xl cursor-pointer">
          Настройки
        </button>
      </div>
    </section>
  );
};

export default Profile;
