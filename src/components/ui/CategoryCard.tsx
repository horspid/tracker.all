import { useNavigate } from "react-router";

interface categoryCardProps {
  data: {
    name: string;
    src: string;
    nameUrl: string;
    shortDescription: string;
  };
}

const CategoryCard = ({ data }: categoryCardProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/categories/${data.nameUrl}`, { state: data });
  };

  return (
    <article
      className="product-card__film rounded-2xl shadow-lg shadow-grey/10"
      onClick={onClickHandler}
    >
      <img
        src={data.src}
        alt="category"
        className="w-full h-420 object-cover rounded-t-2xl cursor-pointer"
      />
      <div className="p-20">
        <h2 className="text-white font-semibold text-xl truncate">
          {data.name[0].toUpperCase() + data.name.slice(1)}
        </h2>
        <p className="mt-10 text-grey font-medium line-clamp-2">
          {data.shortDescription}
        </p>
      </div>
    </article>
  );
};

export default CategoryCard;
