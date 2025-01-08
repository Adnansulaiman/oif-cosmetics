import { IoIosClose } from "react-icons/io";
import CartImage from "../assets/images/product-3.jpeg";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "./ButtonLoading";
const CartItem = ({ item, setCartData }) => {
  const { productId: product, quantity } = item;
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState(null)
  const removeProductInCart = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/api/cart/removecart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data?.message)
      setCartData(response.data?.cart);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex mt-4 justify-between w-full border-b border-black border-opacity-40 pb-4">
      <div className="flex gap-4">
        <img
          src={product?.images?.[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlywYeAIKLUqeqOFScrA517Vu_OoGUytMZ2Q&s'}
          alt={product?.name}
          className="w-28 h-28 rounded-2xl"
        />
        <div className="flex flex-col my-2">
          <h1 className="text-lg font-semibold">{product?.name}</h1>
          <p className="text-xs">${product?.price}</p>
          <div className="flex items-center mt-3 gap-2">
            <div className="flex justify-center items-center p-1 rounded-md border border-black">
              <LuMinus className="text-base " />
            </div>
            <p className="text-base font-semibold">{quantity}</p>
            <div className="flex justify-center items-center p-1 rounded-md bg-black ">
              <LuPlus className="text-base text-white " />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        {loading ? (
          <ButtonLoading color="black" size="4" />
        ) : (
          <IoIosClose
            onClick={() => removeProductInCart(product?._id)}
            className="text-4xl  cursor-pointer  hover:bg-gray-300 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default CartItem;
