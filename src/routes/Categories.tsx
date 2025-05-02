import CategoryCard from "@components/ui/CategoryCard";
import filmImage from "@assets/images/films.jpg";
import serialImage from "@assets/images/serials.jpg";
import animeImage from "@assets/images/anime.jpg";
import cartoonImage from "@assets/images/cartoon.jpg";
import animatedSeriesImage from "@assets/images/animated-series.jpg";

const movies = [
  {
    name: "Фильмы",
    nameUrl: "movie",
    src: filmImage,
    shortDescription: "Добро пожаловать в мир кино!",
  },
  {
    name: "Сериалы",
    nameUrl: "tv-series",
    src: serialImage,
    shortDescription: "Добро пожаловать в мир сериалов!",
  },
  {
    name: "Аниме",
    nameUrl: "anime",
    src: animeImage,
    shortDescription: "Добро пожаловать в мир аниме!",
  },
  {
    name: "Мультики",
    nameUrl: "cartoon",
    src: cartoonImage,
    shortDescription: "Добро пожаловать в мир мультиков!",
  },
  {
    name: "Анимационные-сериалы",
    nameUrl: "animated-series",
    src: animatedSeriesImage,
    shortDescription: "Добро пожаловать в мир аниме-сериалов!",
  },
];

const Categories = () => {
  return (
    <section className="section-container">
      <h1 className="text-4xl text-white font-semibold">🔥 Категории</h1>
      <div className="card-container">
        {movies.map((item, index) => (
          <CategoryCard data={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
