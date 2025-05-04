interface SkeletonProfileProps {
  isCurrentUser: boolean;
}

const SkeletonProfile = ({ isCurrentUser }: SkeletonProfileProps) => {
  return (
    <section className="section-container">
      <div className="grid grid-cols-3 grid-rows-2 gap-40">
        <div className="flex flex-col row-span-full gap-20 bg-lightdark px-20 py-40 rounded-2xl items-center justify-center">
          <div className="rounded-full w-150 h-150 bg-grey/20"></div>
        </div>
        <div className="bg-lightdark w-full px-20 py-40 rounded-2xl h-164"></div>
        <div className="bg-lightdark w-full px-20 py-40 rounded-2xl h-164"></div>
        {isCurrentUser && (
          <div className="bg-lightdark px-20 py-40 rounded-2xl w-full h-full"></div>
        )}
        {isCurrentUser && (
          <div className="bg-lightdark px-20 py-40 rounded-2xl w-full h-full"></div>
        )}
      </div>
    </section>
  );
};

export default SkeletonProfile;
