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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        try {
          const result = await findUserInDatabase(
            user.user_metadata.login,
            true
          );

          if (result && result.user.avatar_url) {
            setAvatarUrl(result.user.avatar_url);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    parseAvatar();
  }, [user]);

  return (
    <section className="flex items-center gap-30">
      <button className="cursor-pointer p-15 rounded-full bg-lightdark">
        <BookmarkICO className="w-30 h-30" />
      </button>
      <button className="cursor-pointer p-15 rounded-full bg-lightdark">
        <NotificationICO className="w-30 h-30" />
      </button>
      <button className="cursor-pointer" onClick={onProfileClick}>
        {isLoading ? (
          <div className="flex items-center gap-20 pr-20 cursor-pointer bg-lightdark [border-radius:50px_16px_16px_50px]">
            <div className="w-60 h-60 rounded-full bg-grey/20 animate-pulse"></div>
            <div className="px-20 w-150 h-30 bg-grey/20 rounded-md animate-pulse"></div>
          </div>
        ) : avatarUrl ? (
          <div className="flex items-center cursor-pointer bg-lightdark [border-radius:50px_16px_16px_50px]">
            <img
              src={avatarUrl}
              alt="user"
              className="w-60 h-60 rounded-full object-cover"
            />
            {user && (
              <span className="px-20 text-white font-semibold overflow-ellipsis overflow-hidden max-w-200">
                {user.user_metadata.login}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center cursor-pointer bg-lightdark [border-radius:50px_16px_16px_50px]">
            <ProfileICO className="w-60 h-60" />
            {user && (
              <span className="px-20 text-white font-semibold overflow-ellipsis overflow-hidden max-w-200">
                {user.user_metadata.login}
              </span>
            )}
          </div>
        )}
      </button>
    </section>
  );
};

export default ControlPanel;
