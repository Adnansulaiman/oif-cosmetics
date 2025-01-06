import { IoIosClose } from "react-icons/io";
import { useEffect, useRef } from "react";
import CartItem from "./CartItem";

const Cart = ({ setCartOpen }) => {
  const cartRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartOpen]);

  return (
    <div
      ref={cartRef}
      className="flex flex-col justify-between top-0 md:my-4 md:mx-12 rounded-2xl  px-10 right-0 absolute w-full md:w-1/3 h-full md:h-[96vh] bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 z-50"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center h-20 w-full  border-b-2 border-opacity-40 border-black mb-3 ">
          <p className="text-lg font-semibold">Cart(0)</p>
          <IoIosClose
            className="text-5xl cursor-pointer hover:bg-gray-300 rounded-full"
            onClick={() => setCartOpen(false)}
          />
        </div>
        <div className=" w-full h-[70vh] overflow-y-auto no-scrollbar">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="flex justify-center items-center rounded-2xl mb-10 mt- w-full h-16 cursor-pointer opacity-85 bg-black hover:opacity-100">
        <p className="text-xl text-white font-bold">Check out</p>
      </div>

    
    </div>
     
  );
};

export default Cart;
