import { options } from "@config/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Bookmark from "@components/ui/Bookmark";
import { cardDetails } from "@interfaces/movies.ts";
import UserRating from "@components/ui/UserRating";
import { useUserStore } from "@store/userStore.ts";

import SkeletonMoviePage from "@components/ui/SkeletonMoviePage";
import ProductCard from "@components/ui/ProductCard";

interface Image {
  url: string | null;
  previewUrl: string | null;
}

interface Images {
  docs: Image[];
}

interface MovieData {
  movie: cardDetails;
  images: Images;
}

const MoviePage = () => {
  const { id } = useParams<string>();
  const [data, setData] = useState<MovieData>();
  const user = useUserStore((state) => state.user);

  const skeletonUrl =
    "https://image.openmoviedb.com/kinopoisk-ott-images/1672343/2a0000019666a7b5ecf5f01b9e6f5456810e/orig";

  const fetchMovieDetails = async () => {
    try {
      const movieUrl = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
      const imagesUrl = `https://api.kinopoisk.dev/v1.4/image?movieId=${id}&limit=3`;

      const [movieResponse, imagesResponse] = await Promise.all([
        fetch(movieUrl, options),
        fetch(imagesUrl, options),
      ]);

      const movieData = await movieResponse.json();
      const imagesData = await imagesResponse.json();

      setData({ movie: movieData, images: imagesData });

      if (!movieResponse.ok || !imagesResponse.ok) {
        throw new Error(
          `Ошибка HTTP: ${(movieResponse.status, imagesResponse.status)}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!id) return "Фильм не найден"; // СТРАНИЦА 404;
  if (!data) return <SkeletonMoviePage />;

  const ratingKp = data.movie.rating?.kp;
  const ratingImdb = data.movie.rating?.imdb;

  const showedActors = data.movie.persons.slice(0, 3);

  const backdrops = data.images.docs;

  return (
    <section className="section-container">
      <div className="relative flex max-h-660">
        <img
          src={
            data.movie.poster?.url ?? data.movie.backdrop?.url ?? skeletonUrl
          }
          alt={data.movie.name || "poster"}
          className="rounded-2xl opacity-80 h-660 w-440 object-cover"
        />
        <div className="flex flex-col gap-20 ml-40 pr-50 text-white max-h-660 overflow-y-scroll">
          <h1 className="text-3xl rounded-xl font-semibold">
            {data.movie.name ?? data.movie.alternativeName}
          </h1>
          {user && (
            <div className="flex gap-20">
              <Bookmark id={id} />
            </div>
          )}
          {data.movie.description && (
            <p className="p-20 bg-lightdark rounded-2xl max-w-700 shadow-lg shadow-grey/10">
              {data.movie.description}
            </p>
          )}
          <div className="flex gap-20 items-center">
            <span>Рейтинг пользвователей:</span>
            {ratingKp ? (
              <p className="params shadow-lg shadow-grey/10">
                {ratingKp.toFixed(1)}
              </p>
            ) : (
              ratingImdb && (
                <p className="params shadow-lg shadow-grey/10">
                  {ratingImdb.toFixed(1)}
                </p>
              )
            )}

            {user && <UserRating movieId={data.movie.id} />}
            <p className="params bg-red shadow-lg shadow-grey/10">10</p>
          </div>
          {data.movie.year && (
            <div className="flex gap-20 items-center">
              <span>Год выхода:</span>
              <p className="params shadow-lg shadow-grey/10">
                {data.movie.year}
              </p>
            </div>
          )}
          {data.movie.genres && (
            <div className="flex gap-20 items-center">
              <span>Жанры:</span>
              {data.movie.genres.map((genre, index) => (
                <p className="params shadow-lg shadow-grey/10" key={index}>
                  {genre.name[0].toUpperCase() + genre.name.slice(1)}
                </p>
              ))}
            </div>
          )}
          {data.movie.persons && (
            <div className="flex gap-20 items-center">
              <span>Актеры:</span>
              <div className="flex gap-10 items-center ">
                {showedActors.map((actor, index) => (
                  <img
                    src={actor.photo}
                    alt={actor.name || "actor"}
                    className="actors bg-cover"
                    title={actor.name}
                    key={index}
                  />
                ))}
                {data.movie.persons.length > 3 && (
                  <button className="rounded-full py-10 px-20 bg-lightdark text-grey font-bold cursor-pointer shadow-lg shadow-grey/10">
                    {`+ ${data.movie.persons.length - 3}`}
                  </button>
                )}
              </div>
            </div>
          )}
          {backdrops && (
            <div className="grid grid-rows-1 grid-cols-3 max-w-700 w-max gap-20">
              {backdrops.map((image, index) => (
                <img
                  src={image.previewUrl || skeletonUrl}
                  alt="backdrop"
                  className="rounded-2xl object-cover h-165 shadow-lg w-full shadow-grey/10"
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {data.movie.sequelsAndPrequels &&
        data.movie.sequelsAndPrequels.length && (
          <div className="mt-40">
            <h2 className="text-2xl rounded-xl font-semibold text-white">
              Сиквелы и приквелы
            </h2>
            <div className="card-container pb-20">
              {data.movie.sequelsAndPrequels.map((movie, index) => (
                <ProductCard data={movie} key={index} />
              ))}
            </div>
          </div>
        )}
    </section>
  );
};

export default MoviePage;
