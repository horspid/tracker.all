const SkeletonProfile = () => {
  return (
    <section className="section-container">
      <div className="grid grid-cols-3 grid-rows-2 gap-40 text-white font-bold">
        <div className="flex flex-col row-span-full gap-20 bg-lightdark px-20 py-40 rounded-2xl items-center justify-center">
          <h1 className="w-250 h-40 bg-grey/20 rounded-2xl"></h1>
          <div className="rounded-full w-150 h-150 bg-grey/20"></div>
        </div>
        <div className="flex flex-col row-start-1 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center">
          <span className="w-150 h-40 bg-grey/20 rounded-2xl"></span>
          <span className="w-80 h-40 bg-grey/20 rounded-2xl"></span>
        </div>
        <div className="flex flex-col row-start-2 gap-20 bg-lightdark w-full px-20 py-40 rounded-2xl items-center">
          <span className="w-150 h-40 bg-grey/20 rounded-2xl"></span>
          <span className="w-80 h-40 bg-grey/20 rounded-2xl"></span>
        </div>
        <button className="bg-lightdark px-20 py-40 rounded-2xl"></button>
        <button className="bg-lightdark px-20 py-40 rounded-2xl"></button>
      </div>
    </section>
  );
};

export default SkeletonProfile;
