import { IoIosClose } from "react-icons/io";
// import CartImage from "../assets/images/product-3.jpeg";
// import { LuMinus, LuPlus } from "react-icons/lu";
// import { useState } from "react";
// import axios from "axios";
// import ButtonLoading from "./ButtonLoading";
import { Link } from "react-router-dom";
import { useUserInfo } from "../context/userContext";
import { useState } from "react";
import ButtonLoading from "./ButtonLoading";
import { LuMinus, LuPlus } from "react-icons/lu";

const CartItem = ({ item }) => {
  const { productId: product, quantity } = item;
  const { removeFromCart,incrementQuantity,decrementQuantity } = useUserInfo();
  const [loading,setLoading] = useState(false)

  const handleRemoveCart =async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try{
      setLoading(true)
      await removeFromCart(product?._id);
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
    
  };

  const handleIncrement =async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try{
      await incrementQuantity(product?._id);
    }catch(err){
      console.log(err)
    }
    
  };

  const handleDecrement =async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try{
      await decrementQuantity(product?._id);
    }catch(err){
      console.log(err)
    }
    
  };

  return (
    <Link to={`/product/${product?._id}`}>
      <div className="flex mt-4 justify-between  w-full border-b border-black border-opacity-40 pb-4">
        <div className="flex gap-4">
          <img
            src={product?.images?.[0] || "default-image-url"}
            alt={product?.name}
            className="w-28 h-28 rounded-2xl"
          />
          <div className="flex flex-col my-2">
            <h1 className="text-lg font-semibold">{product?.name}</h1>
            <p className="text-xs">${product?.price}</p>
            <div className="flex items-center mt-3 gap-2">
              <button onClick={handleIncrement} className=" border p-1 border-black rounded-md"><LuMinus className="text-xs" /></button>
              <p className="text-base font-semibold">{quantity}</p>
              <button onClick={handleDecrement} className="p-1 bg-black text-white rounded-md"><LuPlus className="text-sm" /></button>
            </div>
          </div>
        </div>
        {loading ? <ButtonLoading color='black' size='4' /> : 
        <IoIosClose
          onClick={handleRemoveCart}
          className="text-4xl cursor-pointer hover:bg-gray-300 rounded-full"
        />}
      </div>
    </Link>
  );
};

export default CartItem;