import { options } from "@config/config";
import styles from "./Movie.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "@interfaces/movies";
import Bookmark from "@components/ui/Bookmark";
import MovieTabs from "@components/layout/MovieTabs";

interface Images {
    total: number;
    totalPages: number;
    items: Image[];
}

interface Image {
    imageUrl: string;
    previewUrl: string;
}

interface MovieData {
    movie: Movie;
    images: Images;
}

const MoviePage = () => {
  const { id } = useParams<string>();
  const [data, setData] = useState<MovieData>();

  const fetchMovieDetails = async () => {
    try {
      const [movieResponse, imagesResponse] = await Promise.all([
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, options),
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images`, options),
      ]);
      

      if (!movieResponse.ok || !imagesResponse.ok) {
        throw new Error(
          `Ошибка HTTP: ${movieResponse.status}, ${imagesResponse.status}`,
        );
      }

      const [movie, images] = await Promise.all([
        movieResponse.json(),
        imagesResponse.json(),
      ]);

      setData({ movie, images });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const lastestBackdrops = data?.images.items.slice(0, 2);

  return (
    <section className={styles.movie}>
      {data && (
        <>
          <h1 className={styles.movie__heading}>          
            {data.movie.nameOriginal === null ? data.movie.nameRu : data.movie.nameOriginal}          
          </h1>
          <div className={styles.movie__container}>
            <div className={styles.movie__images}>
              <img
                src={data.movie.posterUrl}
                alt="poster"
              />
              <div className={styles.movie__images_backdrop}>
                {lastestBackdrops && lastestBackdrops.map((backdrop) => (
                  <img
                    src={backdrop.imageUrl}
                    alt="backdrop"
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
