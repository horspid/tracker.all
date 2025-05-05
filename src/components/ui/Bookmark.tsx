import { useEffect, useState } from "react";
import Bookmark2ICO from "@assets/images/icons/bookmark2.svg?react";
import { useUserStore } from "@store/userStore";
import {
  addToWatchlist,
  deleteFromWatchlist,
  isMovieInDatabase,
} from "@services/userFavorites";

interface BookmarkProps {
  id: string;
}

const Bookmark = ({ id }: BookmarkProps) => {
  const user = useUserStore((state) => state.user);
  const [active, setActive] = useState(false);

  const onClickHandler = async () => {
    try {
      if (active) {
        await deleteFromWatchlist(id);
        setActive(false);
      } else {
        await addToWatchlist(id);
        setActive(true);
      }
    } catch (error) {
      console.error("Ошибка при добавлении/удалении из избранного:", error);
    }
  };

  useEffect(() => {
    const checkIfMovieInWatchlist = async () => {
      const result = await isMovieInDatabase(id);

      if (result) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    checkIfMovieInWatchlist();
  }, [id]);

  if (!user) return null;

  return (
    <button
      className={`cursor-pointer ${active ? "bookmark-active" : ""}`}
      onClick={onClickHandler}
    >
      <Bookmark2ICO />
    </button>
  );
};

export default Bookmark;
