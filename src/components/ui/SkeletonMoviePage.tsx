const SkeletonMoviePage = () => {
  return (
    <section className="section-container">
      <div className="relative flex">
        <div className="rounded-2xl opacity-80 h-660 w-440 bg-lightdark" />
        <div className="flex flex-col gap-20 ml-40">
          <div className="rounded-xl w-500 h-40 bg-lightdark"></div>
          <div className="p-20 bg-lightdark rounded-2xl w-700 h-180"></div>
          <div className="flex gap-20">
            <div className="w-200 h-40 bg-lightdark rounded-2xl"></div>
            <div className="w-200 h-40 bg-lightdark rounded-2xl"></div>
          </div>
          <div className="grid grid-cols-3 gap-20 h-160">
            <div className="rounded-2xl w-full h-full bg-lightdark"></div>
            <div className="rounded-2xl w-full h-full bg-lightdark"></div>
            <div className="rounded-2xl w-full h-full bg-lightdark"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonMoviePage;
