const SkeletonMoviePage = () => {
  return (
    <section className="section-container">
      <div className="relative flex">
        <div className="rounded-2xl opacity-80 h-660 w-440 bg-lightdark" />
        <div className="flex  flex-col gap-20 ml-40 text-white ">
          <h1 className="text-3xl rounded-xl font-semibold w-500 h-40 bg-lightdark"></h1>
          <p className="p-20 bg-lightdark rounded-2xl w-700 h-180"></p>
          <div className="flex gap-20 items-center w-200 h-40 bg-lightdark rounded-2xl"></div>
          <div className="flex gap-20 items-center w-200 h-40 bg-lightdark rounded-2xl"></div>
          <div className="flex gap-20 items-center w-200 h-40 bg-lightdark rounded-2xl"></div>
          <div className="flex gap-20 items-center w-200 h-40 bg-lightdark rounded-2xl"></div>

          <div className="grid grid-rows-1 grid-cols-3 max-w-700 gap-20 h-160 overflow-hidden">
            <div className="rounded-2xl shadow-lg shadow-grey/10 w-full h-full bg-lightdark"></div>
            <div className="rounded-2xl shadow-lg shadow-grey/10 w-full h-full bg-lightdark"></div>
            <div className="rounded-2xl shadow-lg shadow-grey/10 w-full h-full bg-lightdark"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonMoviePage;
