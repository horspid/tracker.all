import { useEffect, useState } from "react";
import SoonICO from "@assets/images/icons/calendar.svg?react";
import { fetchMoviesByMonth } from "@services/Soon";
import { cardPreview } from "@interfaces/movies";
import ProductCard from "@components/ui/ProductCard";
import SkeletonCard from "@components/ui/SkeletonCard";

type Months =
  | "Январь"
  | "Февраль"
  | "Март"
  | "Апрель"
  | "Май"
  | "Июнь"
  | "Июль"
  | "Август"
  | "Сентябрь"
  | "Октябрь"
  | "Ноябрь"
  | "Декабрь";

const months: Months[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const Soon = () => {
  const date = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(date.getMonth());
  const [data, setData] = useState<cardPreview[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await fetchMoviesByMonth(currentMonthIndex);
      setData(result);
    };

    fetchMovies();
  }, [currentMonthIndex]);

  console.log(data);
  return (
    <section className="section-container">
      <h1 className="flex gap-20 items-center rounded-2xl font-semibold text-white text-4xl">
        <span>⏰ Дата выхода</span>
      </h1>
      <div className="flex gap-20 flex-wrap mt-40">
        {months.map((month, index) => {
          const monthIndex = index + 1;

          return (
            <button
              className={`flex-1/7 text-white cursor-pointer px-30 py-10 bg-lightdark rounded-2xl ${
                currentMonthIndex === monthIndex ? "bg-red text-white" : ""
              }`}
              onClick={() => setCurrentMonthIndex(monthIndex)}
              key={index}
            >
              {month}
            </button>
          );
        })}
      </div>
      <div className="card-container">
        {!data.length && <SkeletonCard listToRender={10} />}
        {data.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Soon;
