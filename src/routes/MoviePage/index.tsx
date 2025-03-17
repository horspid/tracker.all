import { options } from "@config/config";
import styles from "./Movie.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "@interfaces/movies";
import Bookmark from "@components/ui/Bookmark";
import MovieTabs from "@components/layout/MovieTabs";

interface Image {
  movieId: number
  type: string
  url: string
  previewUrl: string
  height: number
  width: number
  createdAt: string
  updatedAt: string
  id: string
}

interface Images {
  docs: Image[];
  total: number,
  limit: number,
  page: number,
  pages: number
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
      const movieUrl = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
      const imagesUrl = `https://api.kinopoisk.dev/v1.4/image?movieId=${id}&limit=2`;

      const [movieResponse, imagesResponse] = await Promise.all([
        fetch(movieUrl, options),
        fetch(imagesUrl, options),
      ]);

      const movieData = await movieResponse.json();
      const imagesData = await imagesResponse.json();
  
      setData({movie: movieData, images: imagesData});

      if (!movieResponse.ok || !imagesResponse.ok) {
        throw new Error(`Ошибка HTTP: ${movieResponse.status, imagesResponse.status }`);
      }
    } catch (error) {
      console.error(error);
    }
  } 

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
              <img
                src={data.movie.poster.url}
                alt="poster"
              />
              <div className={styles.movie__images_backdrop}>
                {lastestBackdrops && lastestBackdrops.map((backdrop, index) => (
                  <img
                    src={backdrop.url}
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
