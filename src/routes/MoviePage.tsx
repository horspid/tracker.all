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
    "https://kinopoisk-ru.clstorage.net/B2Z983y48/d45fe0AQ/Q0-uE6iAq8Yglklm1JfXmRrMW_WtmtvkKqOYOtLgNcxBVtZrAapdPm83VXUK8BKpjsH_8cdZZ7WbVwrCbTDQMVI_79copJqmQVP4d1QX0yl6bd9EyYrKZdowmsgwYyaKYhVk6XILfK9fJ9UVOtHivc7ACwGmmqCxChTcE86DgrAgPNxnXiQZdQNkG9eG1HGK6d9ehdj9CnW604ppoCNXC5FWhGhDaGxMi7blpTlCcF-vQh6BhehBh8ml75L_gVGhw0-9ZH41WrTTFVjUNURDuor__HQq_kr0mIJaaUPz9kijR2aqwkh_fGj3t2cYkPFOz0L9YGWoYed4l89hrIEiEqK_7Ub-1VqGA0WqJhU1oirL7ZwFyvzq1HsSy4iAUVYogbfHi2BKnL1pZ6YVuhGQLg1izXBkiyHkidceQ84i4mGgfv8GveQJR6MFKzTWd4Ba6A3_hrqfune6I3uJI2GXalPVlgrjqJ8c24Wllpmgsm4uss8Sx7vgJHjHjWI-oDIggN_PB1zXCTUB1ljnNPUSOMuvPZTYLGu02NNbeXFgVmoTFIQ7Edr_7XjnVJaJItIOfoJeQcaKMaYLN10yLOEzMeNOHwQ-xxk2o1QqNNVE4gkaLH6UujyrJ8gR-eqiE9Xa4CdXyVD7nlyb1DU0yUCAPPzzjmLXazJECpY-Qk7yAjJSPY1HjscpNKD3SQandrJryR1Np7svSWWpU6u7oJB3KMOGx4kAGQ8tKXQlR2rQgj7-c77SJUviF-lXnvM-QNIDwP4N5K81eQQBlAk39jdweemuTZWr7WoGCMPIeNCjJinztcWroFt9zNqEZcd6kWC9n4JuYdaJEMQrRd4QXiNSoFNcHHdcxJv3Qsf5pDSnwUkZnJwES61K1Phzukry8YfY4JUGqaApLR4bdzbm2hHR7n8gTsBVWvIXGAfMoc0yM_HzTD9WH3cah6DGW_VVB_Ho--5f1epfW_W646prUOB3WDO2x-hyCT9dCpXnd0qD8BxNob0h5WlDBCqlLQBPILLxIQyNV11Wuqdwl2lVdSVBaPiNzZa6vouEeCNYOKPxNygiJbZ5o8qNbrsHlOWocJNeDrDvwRbJouUbxb2iPlOjEDOcHQVsZygUQ0SZZuTU44vqv_536lxpJtvDiAmDIYfqgHXlCHDazOwaZVcUq3DRzDzz7WDlicNUCVc9QRzS05NRDuxnTlSY5pO3egc2J8H5en38FHocacZLEhgLUPB2alMmZumA-v-_iFWnJrpwos-dIgxz1RoTJ6mljOP84HOiQy2sVhwWqvTTtao3RMVBiQpdfiXr7LgFKiOKmpNAhCrgd-c40Arv_hhVRTaqA4Jd77OdggeaQjV6Fn7xjgNzwaD_7Fev1onFkufY9IYXUUvKD75X-C1rhYjjmQiw8zf5EweUq_DYHPzL5lbm2rBD3R3CLJBnSdIn29TvsQ6hU_GSr61FTiTIZ5EWmwbkZqDqmb4tJFqfqPU6cuq4QeH2WbA05lnB2E---tWmtFjgUK79As3yVPoQ1kmU7iHfcmEDI26PdO7XeDZjhbp3JBUT-Kmf_0bLDollqqDrWWCQJ2mDtuWKY4ttnWi2FSXIwDB9TKAMsqTrg2SJ91yDnXOCs2EOD3Rfd9sXMNeplLbFsam67w8WWSxLxMqQCQmxIeXpgSfkKJJKXxza97Ski0JQLF7hH_CWu-BF6RdcE_zxMzFCbE12nXb790PlS4dG18B5Cb-ul4i9SwY5A7n4YiBkClMUpdkRe6y8-xR2lQqTk93PQn9RBWkjZRq0L0JNQ1GxQS--JC02GQaxNnk1VDWSWdmODgQ4fKsm6XHqe0Bgl9mBhJcJELrNb7unhcWqMkL9_yHv0ue6U7SrFQxAbjNB4FCe3YYc1ioG0eZ6ZdREcGibH_-GOszYZSqxGBmAgJc70ycWCXKKvFyL16fVOaNwDe6QP6EHWdMn-UVtMk-ygrNiHA_2LzZrNXCWmwT3N1I4qL3t9vnNa6apYmo4QjJEGkAnRsmAmF3O6lbGtFhSQD1v4M5jh9pwFUsU_UH-84HxcN5fBU3WCWdT1jsEtGbS6Ts_f1fanGp1iIOau2LSpkvzhcb7kWktDhhVFKd5EgCPf5HvsiWZ4SYYF77j3JNyE9LuThb-hQnHA3RIVuS1cGkq3w6Huh54BnkRCgoQI0U7o0aV-uHZDI9bRwakeOFyzD2h3yMnK7LniwdvQY7Q4rBwHPx2jBTYhwA1mzbnFyPqmn2sB4n-6aaaU0ipcRBFuaGE1_sAa1-NeNX3tktD4t7fAh0h1ojSRer2fsLtIjPDE1xd5lzGOmTCNqll9GbB-xhOTRbLrvm0-sD56NBBR8pj57aJcal8rWplp2X5sHC9noA9oBUa86Q5ldywTvBxAUJPjDQ-NHrUI9WKV0a1gjjY3C8mGA2qxsnSSkqQ8zULARdmaNHKTb6r9ga1O6BTPz0yLuH225HX6vR84m0y47NQ7-8Gjybr1CIHWdU2tMLrq7x_5TvfWHQaMHurcCOEanEHZNsRuv9viyR3xehhcs3tEv-R5MlBVHlnz0OekVIDYL6-hx7XCdaS9ZoXpleDaviPjTbITtgUyvJLC1CRt0mT5Qa4gLutH0sX5PboEjKPv6DPoEUIUSYol1yA_IMDwXK93bUMR2gE0WUpBuWFAblare20Su1YRxvC6hlTAyTawFWkuMOKfp6Ix9Xl60Jwbe6Q_xEHCSMVKzRcwU2AoeHyrl23DWaK5PL2K1cnh4Npys1P5kqMqAZ4EFiY4LG22GK3ZDsBmk78itVH1zlCwn9PIp6BJLgzpRnlv0DswIJBoT2sFq_UKDaANih3B0UhOUpsPFRLrAtmCeJL2OEQl_rjB7Wp0okMzxrWR7bJslE93zCso4RaEBeZZj5CTYKjgFAsfeS95drXk2fbFUVGwAla7m0WSh9KBath2xsCsXXI8WTEqcC7j2xYhucU2UPjX48AXHImmHLmq2X9M";

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
          src={data.movie.poster.previewUrl || skeletonUrl}
          alt={data.movie.name || "poster"}
          className="rounded-2xl opacity-80 max-h-660"
        />
        <div className="flex flex-col gap-20 ml-40 pr-50 text-white max-h-660 overflow-y-scroll">
          <h1 className="text-3xl rounded-xl font-semibold">
            {data.movie.name}
          </h1>
          {user && (
            <div className="flex gap-20">
              <Bookmark id={id} />
            </div>
          )}
          <p className="p-20 bg-lightdark rounded-2xl max-w-700 shadow-lg shadow-grey/10">
            {data.movie.description}
          </p>
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
                <button className="rounded-full py-10 px-20 bg-lightdark text-grey font-bold cursor-pointer shadow-lg shadow-grey/10">
                  {`+ ${data.movie.persons.length - 3}`}
                </button>
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
      {data.movie.sequelsAndPrequels.length && (
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
