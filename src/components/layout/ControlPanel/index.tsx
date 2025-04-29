import BookmarkICO from "@assets/images/icons/bookmark.svg?react";
import NotificationICO from "@assets/images/icons/notification.svg?react";
import ProfileICO from "@assets/images/icons/profile.svg?react";
import { findUserInDatabase } from "@services/userAuth";
import { useUserStore } from "@store/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "./ControlPanel.css";

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
        const result = await findUserInDatabase(user.user_metadata.login);

        if (result && result.user.avatar_url) {
          setAvatarUrl(result.user.avatar_url);
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
      <button className="cursor-pointer" onClick={() => onProfileClick()}>
        {avatarUrl ? (
          <div className="cursor-pointer">
            <img src={avatarUrl} alt="user" />
          </div>
        ) : (
          <div className="flex items-center cursor-pointer bg-lightdark rounded-profile rounded-r-2xl">
            <ProfileICO className="w-60 h-60" />
            <span className="px-20 text-white font-semibold overflow-ellipsis overflow-hidden max-w-200">
              horspid
            </span>
          </div>
        )}
      </button>
    </section>
  );
};

export default ControlPanel;
