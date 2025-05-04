interface SkeletonCardProps {
  listToRender: number;
}

const SkeletonCard = ({ listToRender }: SkeletonCardProps) => {
  const skeletons = Array(listToRender).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          className="product-card__film rounded-2xl shadow-lg shadow-grey/10"
          key={index}
        >
          <div className="w-full h-420 rounded-t-2xl bg-grey/20"></div>
          <div className="p-20">
            <div className="bg-grey/20 rounded-md h-28"></div>
            <div className="mt-10 bg-grey/20 rounded-md h-50"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
