import { options } from "@config/config";
import styles from "./Movie.module.scss";
import { MovieInfo } from "@interfaces/movies";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Bookmark from "@components/ui/Bookmark";
import MovieTabs from "@components/layout/MovieTabs";

interface Images {
  file_path: string;
}

interface Image {
  backdrops: Images[];
  posters: Images[];
}

interface MovieData {
  movie: MovieInfo;
  images: Image;
}

const MoviePage = () => {
  const { id } = useParams<string>();
  const [movieData, setMovieData] = useState<MovieData>();

  const fetchMovieDetails = async () => {
    try {
      const [movieResponse, imagesResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options),
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

      setMovieData({ movie, images });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const lastestBackdrops = movieData?.images.backdrops.slice(0, 2);

  console.log(lastestBackdrops);
  return (
    <section className={styles.movie}>
      {movieData && (
        <>
          <h1 className={styles.movie__heading}>{movieData.movie.title}</h1>
          <div className={styles.movie__container}>
            <div className={styles.movie__images}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieData.movie.poster_path}`}
                alt="poster"
              />
              <div className={styles.movie__images_backdrop}>
                {lastestBackdrops?.map((backdrop) => (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${backdrop.file_path}`}
                    alt="backdrop"
                  />
                ))}
              </div>
            </div>
            <div className={styles.movie__content}>
              <Bookmark />
              <MovieTabs data={movieData.movie} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MoviePage;
