import { IoIosClose } from "react-icons/io";
import CartImage from '../assets/images/product-3.jpeg';
import { LuMinus,LuPlus } from "react-icons/lu";

const CartItem = () => {
  return (
    <div className="flex mt-4 justify-between w-full border-b border-black border-opacity-40 pb-4">
                <div className="flex gap-4">
                    <img src={CartImage} alt="" className="w-28 h-28 rounded-2xl" />
                    <div className="flex flex-col my-2">
                        <h1 className="text-lg font-semibold">Product name</h1>
                        <p className="text-xs">$99.99</p>
                        <div className="flex items-center mt-3 gap-2">
                                  <div className="flex justify-center items-center p-1 rounded-md border border-black">
                                    <LuMinus className="text-base " />
                                  </div>
                                  <p className="text-base font-semibold">1</p>
                                  <div className="flex justify-center items-center p-1 rounded-md bg-black ">
                                    <LuPlus className="text-base text-white " />
                                  </div>
                                </div>
                    </div>
                </div>
                <div className="flex">
                   <IoIosClose className="text-4xl  cursor-pointer  hover:bg-gray-300 rounded-full" /> 
                </div>
            </div>
  )
}

export default CartItem
