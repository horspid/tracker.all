interface SkeletonCardProps {
  listToRender: number;
}

const SkeletonCard = ({ listToRender }: SkeletonCardProps) => {
  const skeletons = Array(listToRender).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <article
          className="product-card__film rounded-2xl shadow-lg shadow-grey/10"
          key={index}
        >
          <div className="w-full h-420 rounded-t-2xl bg-grey/20"></div>
          <div className="p-20">
            <h2 className=" font-semibold text-xl truncate bg-grey/20 rounded-md h-28"></h2>
            <p className="mt-10 bg-grey/20 font-medium line-clamp-2 rounded-md h-50"></p>
          </div>
        </article>
      ))}
    </>
  );
};

export default SkeletonCard;
