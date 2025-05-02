import { useNavigate } from "react-router";
import { cardPreview } from "@interfaces/movies.ts";

interface ProductCardProps {
  data: cardPreview;
}

const skeletonUrl =
  "https://image.openmoviedb.com/kinopoisk-ott-images/1672343/2a0000019666a7b5ecf5f01b9e6f5456810e/orig";

const ProductCard = ({ data }: ProductCardProps) => {
  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate(`/movies/${data.id}`);
  };

  return (
    <article className="product-card__film rounded-2xl shadow-lg shadow-grey/10">
      <img
        className="w-full h-420 object-cover rounded-t-2xl cursor-pointer"
        src={data.poster?.url ?? data.backdrop?.url ?? skeletonUrl}
        onClick={navigateHandle}
      />
      <div className="p-20">
        <h2 className="text-white font-semibold text-xl truncate">
          {data.name ?? data.alternativeName}
        </h2>
        {data.shortDescription && (
          <p className="mt-10 text-grey font-medium line-clamp-2">
            {data.shortDescription}
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
