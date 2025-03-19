import { options } from "@config/config";
import styles from "./Movie.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Bookmark from "@components/ui/Bookmark";
import MovieTabs from "@components/layout/MovieTabs";
import { cardDetails } from "@interfaces/movies.ts";

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

  const fetchMovieDetails = async () => {
    try {
      const movieUrl = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
      const imagesUrl = `https://api.kinopoisk.dev/v1.4/image?movieId=${id}&limit=2`;

      const [movieResponse, imagesResponse] = await Promise.all([
        fetch(movieUrl, options),
        fetch(imagesUrl, options),
      ]);

      const movieData = await movieResponse.json();
      const imagesData = await imagesResponse.json();

      setData({ movie: movieData, images: imagesData });

      if (!movieResponse.ok || !imagesResponse.ok) {
        throw new Error(
          `Ошибка HTTP: ${(movieResponse.status, imagesResponse.status)}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const lastestBackdrops = data?.images.docs;

  return (
    <section className={styles.movie}>
      {data && (
        <>
          <h1 className={styles.movie__heading}>
            {data.movie.name || data.movie.alternativeName}
          </h1>
          <div className={styles.movie__container}>
            <div className={styles.movie__images}>
              <img src={data.movie.poster.url ?? undefined} alt="poster" />
              <div className={styles.movie__images_backdrop}>
                {lastestBackdrops &&
                  lastestBackdrops.map((backdrop, index) => (
                    <img
                      src={backdrop.url ?? undefined}
                      alt="backdrop"
                      key={index}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.movie__content}>
              <Bookmark />
              <MovieTabs data={data.movie} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MoviePage;
