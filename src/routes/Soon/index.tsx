import { useEffect, useState } from 'react';
import styles from './Soon.module.scss'
import SoonICO from '@assets/images/icons/calendar.svg?react'
import { fetchMoviesByMonth } from '@services/Soon';
import { cardPreview } from '@interfaces/movies';
import ProductCard from '@components/ui/ProductCard';

type Months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

const months: Months[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const Soon = () => {

  const date = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(date.getMonth());
  const [data, setData] = useState<cardPreview[]>([]);


  
  const onClickHandler = async () => {
    const nextMonthIndex = (currentMonthIndex + 1) % months.length;
    setCurrentMonthIndex(nextMonthIndex);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await fetchMoviesByMonth(currentMonthIndex);
      setData(result);
    };

    fetchMovies();
  }, [currentMonthIndex]);

  console.log(data)

  return (
    <section className={styles.soon}>
    <div className={styles.soon__content}>
      <div className={styles.soon__entry}>
        <SoonICO className={styles.soon__ico}/>
        <h1 className={styles.soon__title}>
          Releasing in <span onClick={onClickHandler}>{months[currentMonthIndex]}</span>
        </h1>
      </div>
    </div>
    <div className={styles.soon__items}>
      {data.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  </section>
  );
};

export default Soon;
