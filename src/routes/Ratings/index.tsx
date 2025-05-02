import { useEffect, useState } from "react";
import styles from "./Ratings.module.scss";
import RatingsICO from "@assets/images/icons/rating.svg?react";
import ProductCard from "@components/ui/ProductCard";
import { fetchUserRatings } from "@services/userRatings";
import { cardPreview } from "@interfaces/movies";
import { useUserStore } from "@store/userStore.ts";
import { useNavigate } from "react-router";
import SkeletonCard from "@components/ui/SkeletonCard";

const Ratings = () => {
  const [loading, setLoading] = useState(true);
  const [userRated, setUserRated] = useState<cardPreview[] | null>([]);
  const { userRatings, setUserRatings } = useUserStore.getState();

  const navigate = useNavigate();

  const initialRatings = async () => {
    try {
      const result = await fetchUserRatings();

      if (result) {
        setUserRated(result.fetchedMovies);
        setUserRatings(result.rated);
        setLoading(false);
      }
    } catch (error) {
      throw new Error("Ошибка при загрузке оценённых фильмов" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialRatings();
  }, []);

  if (loading) {
    return (
      <div className="section-container">
        <h1 className="w-500 h-60 bg-lightdark rounded-2xl"></h1>
        <div className="card-container">
          <SkeletonCard listToRender={8} />
        </div>
      </div>
    );
  }

  if (userRatings === null) {
    navigate(`/login`);
    return null;
  }

  if (userRatings.length === 0) {
    return (
      <section className="section-container">
        <h1 className="text-center text-4xl text-white font-bold mt-160">
          Пока-что вы не оценили ни один фильм / сериал :)
        </h1>
      </section>
    );
  }

  return (
    <section className="section-container">
      <h1 className="flex gap-20 items-center rounded-2xl font-semibold text-white text-4xl">
        ♥️ Оценки
      </h1>
      <div className="card-container">
        {userRated &&
          userRated.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default Ratings;
