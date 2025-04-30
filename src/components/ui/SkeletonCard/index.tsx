import "./SkeletonCard.css";

interface SkeletonCardProps {
  listToRender: number;
}

const SkeletonCard = ({ listToRender }: SkeletonCardProps) => {
  const skeletons = Array(listToRender).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <article
          className={`product-card ${index === 0 ? "skeleton__first" : ""}`}
          key={index}
        >
          <div className="relative">
            <div className={`w-full ${index === 0 ? "h-450" : "h-360"}`}></div>
          </div>
          {/* <div className="skeleton_card__stats">
            <h2 className="bg-lightestdark w-160 rounded-md h-25"></h2>
          </div> */}
        </article>
      ))}
    </>
  );
};

export default SkeletonCard;
