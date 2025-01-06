import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ListItem = ({product}) => {
  return (
    <Link to={`/product/${product?._id}`}>
    <div
      className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-cover bg-center  flex flex-col justify-between p-2 "
      style={{ backgroundImage: `url(${product?.images[0]})` }}
    >
        <div className="flex justify-end">
        <BsArrowUpRight className="text-2xl" />

        </div>
      <p className="m-1 font-semibold">{product?.name}</p>
    </div>
    </Link>
  );
};

export default ListItem;
