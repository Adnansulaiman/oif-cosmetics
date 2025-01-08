import { IoIosClose } from "react-icons/io";
import { useEffect, useRef,useState } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import Loading from "./Loading";
import ButtonLoading from "./ButtonLoading";

const Cart = ({ setCartOpen }) => {
  const [cartData,setCartData] = useState(null);
  const [cartLoading,setLoading] = useState(true);
  const cartRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (cartRef.current && !cartRef.current.contains(event.target)) {
  //       setCartOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [setCartOpen]);

  useEffect(()=>{
    const fetchCartProducts = async()=>{
      try{
          const token = localStorage.getItem('token')
          const response = await axios.get(`http://localhost:3000/api/cart/getcart`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
          });

          setCartData(response.data)
          // console.log(response.data)
      }catch(err){
          console.log("Error :" ,err)
      }finally{
        setLoading(false)
      }
  }
  fetchCartProducts()
  },[cartData])
  
  // console.log(cartData);
  

  return (
    <>
    {cartLoading && <div className="flex justify-center items-center w-full h-full">
        <ButtonLoading color='black' size='8' />
      </div> }
      <div
      ref={cartRef}
      // className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col justify-between md:top-4 md:my-4 md:mx-12 md:rounded-2xl md:w-1/3 md:h-[96vh]"

      className="flex flex-col justify-between top-0 md:-top-4 md:my-4 md:mx-12 rounded-2xl  px-10 right-0 md:-right-12 absolute w-full md:w-1/3 h-screen md:h-[96vh] bg-slate-200 z-50"
    >
      
      
        <div className="flex flex-col">
        <div className="flex justify-between items-center h-20 w-full  border-b-2 border-opacity-40 border-black mb-3 ">
          <p className="text-lg font-semibold">{`Cart(${0})`}</p>
          <IoIosClose
            className="text-5xl cursor-pointer hover:bg-gray-300 rounded-full"
            onClick={() => setCartOpen(false)}
          />
        </div>
        <div className=" w-full h-[60vh] overflow-y-auto no-scrollbar">
        {cartData?.cartItems?.length > 0 ? (
            cartData.cartItems.map((item, i) => (
              <CartItem key={i} item={item} setCartData={setCartData} />
            ))
          ) : (
            <p className="text-center text-lg font-semibold mt-3 text-gray-500">Your cart is empty</p>
          )}
        </div>
        <div className="flex mt-4 items-center gap-2 ">
          <p className="text-lg font-semibold">Total price : </p>
          <p className="text-lg font-bold">${cartData?.totalPrice}</p>
        </div>
      </div>
      
      <div className="flex justify-center items-center rounded-2xl mb-10 mt- w-full h-16 cursor-pointer opacity-85 bg-black hover:opacity-100">
        <p className="text-xl text-white font-bold">Check out</p>
      </div>
      
      </div>
    
    </>
  );
};

export default Cart;
