import SkeletonCard from "./SkeletonCard";

interface SkeletonMoviePageProps {}

const SkeletonMoviePage = (props: SkeletonMoviePageProps) => {
  return (
    <section className="section-container">
      <div className="relative flex">
        <img
          src="https://image.openmoviedb.com/kinopoisk-images/10900341/caf9f155-1a19-42f1-a0f3-9c8773e9083e/orig"
          alt=""
          className="rounded-2xl opacity-80 max-h-660"
        />
        <div className="flex  flex-col gap-20 ml-40 text-white ">
          <h1 className="text-3xl rounded-xl font-semibold">
            Иван Васильевич меняет профессию
          </h1>
          <p className="p-20 bg-lightdark rounded-2xl max-w-700 shadow-lg shadow-grey/10">
            Пострадав в результате несчастного случая, богатый аристократ Филипп
            нанимает в помощники человека, который менее всего подходит для этой
            работы, – молодого жителя предместья Дрисса, только что
            освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к
            инвалидному креслу, Дриссу удается привнести в размеренную жизнь
            аристократа дух приключений.
          </p>
          <div className="flex gap-20 items-center">
            <span>Рейтинг пользвователей:</span>
            <p className="params shadow-lg shadow-grey/10">7.8</p>
            <p className="params bg-red shadow-lg shadow-grey/10">10</p>
          </div>
          <div className="flex gap-20 items-center">
            <span>Год выхода:</span>
            <p className="params shadow-lg shadow-grey/10">2011</p>
          </div>
          <div className="flex gap-20 items-center">
            <span>Жанры:</span>
            <p className="params shadow-lg shadow-grey/10">Драма</p>
            <p className="params shadow-lg shadow-grey/10">Коммедия</p>
          </div>
          <div className="flex gap-20 items-center">
            <span>Актеры:</span>
            <div className="flex gap-10 items-center ">
              <img
                src="https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_71427.jpg"
                alt="Толя Буржанин"
                className="actors bg-cover "
                title="Толя Буржанин"
              />
              <img
                src="https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_41644.jpg"
                title="Вася пупкин"
                alt="name actor"
                className="actors bg-cover"
              />
              <img
                src="https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_57174.jpg"
                title="Вася пупкин"
                alt="name actor"
                className="actors bg-cover"
              />
              <button className="rounded-full py-10 px-20 bg-lightdark text-grey font-bold cursor-pointer shadow-lg shadow-grey/10">
                +72
              </button>
            </div>
          </div>
          <div className="grid grid-rows-1 grid-cols-3 max-w-700 gap-20 overflow-hidden">
            <img
              src="https://image.openmoviedb.com/kinopoisk-images/1773646/dd6228ad-c0fe-4693-a703-f1158c2de023/orig"
              alt=""
              className="rounded-2xl shadow-lg shadow-grey/10"
            />
            <img
              src="https://image.openmoviedb.com/kinopoisk-images/1773646/a53e0054-96f9-42e1-b9f2-30c76ddc18ae/orig"
              alt=""
              className="rounded-2xl"
            />
            <img
              src="https://image.openmoviedb.com/kinopoisk-images/1900788/56bf76fb-58e9-42b6-94d8-9e3bd4c58e85/orig"
              alt=""
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div className="mt-40">
        <h2 className="text-2xl rounded-xl font-semibold text-white">
          Сиквелы и приквелы
        </h2>
        <div className="card-container pb-20">
          <SkeletonCard listToRender={4} />
        </div>
      </div>
    </section>
  );
};

export default SkeletonMoviePage;
