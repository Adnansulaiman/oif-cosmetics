import Image from "../assets/images/product-5.jpeg";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { IoMdCheckmark } from "react-icons/io";
import ButtonLoading from "../components/ButtonLoading";
import { useUserInfo } from "../context/userContext";

const SingleProduct = () => {
  const [quantity,setQuantity] = useState(1)
  const {addToCart} = useUserInfo()
  const [mainImage,setMainImage] = useState(null)
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  // const [cartData, setCartData] = useState(null);
  const [cartSuccess,setCartSuccess] = useState(false);

  const handleAddToCart = async () => {
    // e.stopPropagation(); // Prevent Link navigation
    // e.preventDefault();
    try {
      setCartLoading(true);
      await addToCart(product._id,quantity)
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
      setCartSuccess(true)
      setTimeout(()=>{
        setCartSuccess(false)
      },2000)
    }
  };

  const handleIncrement =()=>{
    if(quantity > 1){
      setQuantity((prev)=> prev-1)
    }
  }
  const handleDecrement =()=>{
    if(quantity < 10) setQuantity((prev)=> prev+1)
  }
  
  useEffect(() => {
    try {
      const fetchProductDetails = async (id) => {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
        setMainImage(response.data?.images[0])
      };
      fetchProductDetails(prodId)
    } catch (err) {
      console.err(err);
    }finally{
      setLoading(false)
    }
    
  }, [prodId]);
  console.log(product)
  return (
    <>
    {loading && <Loading />}
    {product && (
      <div className=" flex md:flex-row flex-col w-full h-screen ">
      <div className="flex mt-5 w-full md:w-1/2 jus items-center h-[70vh] md:h-screen pl-10 pb-10 md:pb-0 md:pl-12 pt-20 md:pt-0 gap-5">
        <img
          src={mainImage}
          alt=""
          className="w-72  md:w-[542px] bg-center bg-cover rounded-2xl drop-shadow-md  "
        />
        <div className="flex  flex-col gap-5 md:gap-3">
          {product?.images?.map((image,i) =>(
            <img
            key={i}
            onClick={()=> setMainImage(image)}
            src={image}
            className={`w-16 h-16 cursor-pointer md:w-32 md:h-32 rounded-lg md:rounded-2xl drop-shadow-md ${mainImage === image && 'border border-black'}  cursor-pointer"`}
            alt=""
          />
          ))}
          {/* <img
            onClick={()=> setMainImage(product?.images[0])}
            src={product?.images[0]}
            className={`w-16 h-16 md:w-32 md:h-32 rounded-lg md:rounded-2xl drop-shadow-md ${mainImage === product?.images[0] && 'border border-black'}  cursor-pointer"`}
            alt=""
          />
          <img
            onClick={()=> setMainImage(product?.images[1])}
            src={product?.images[1]}
            className={`w-16 h-16 md:w-32 md:h-32 rounded-lg md:rounded-2xl drop-shadow-md ${mainImage === product?.images[1] && 'border border-black'}  cursor-pointer"`}
            alt=""
          />
          <img
            onClick={()=> setMainImage(product?.images[2])}
            src={product?.images[2]}
            className={`w-16 h-16 md:w-32 md:h-32 rounded-lg md:rounded-2xl drop-shadow-md ${mainImage === product?.images[2] && 'border border-black'}  cursor-pointer"`}
            alt=""
          />
          <img
            onClick={()=> setMainImage(product?.images[3])}
            src={product?.images[3]}
            className={`w-16 h-16 md:w-32 md:h-32 rounded-lg md:rounded-2xl drop-shadow-md ${mainImage === product?.images[3] && 'border border-black'}  cursor-pointer"`}
            alt=""
          /> */}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 h-screen bg-gray-200 rounded-t-2xl md:rounded-s-2xl px-10  py-5 md:px-12 md:py-32 ">
        <h2 className="text-base md:text-xl font-semibold">{product?.brand}</h2>
        <h1 className="text-3xl md:text-4xl font-bold">{product?.name}</h1>
        <div className="flex gap-3 md:gap-6 mt-2 md:mt-3 items-center">
          <div className="flex gap-1 md:gap-2">
            <IoStar className="text-base md:text-lg" />
            <IoStar className="text-base md:text-lg" />
            <IoStar className="text-base md:text-lg" />
            <IoStarHalf className="text-base md:text-lg" />
            <IoStarOutline className="text-base md:text-lg" />
          </div>
          <p className="text-sm font-semibold md:text-base">18 Reviews</p>
        </div>
        <div className="flex gap-2 md:gap-3 mt-5">
          <div className="md:w-6 md:h-6 w-4 h-4 rounded-full shadow-md bg-[#a7667c] ring-1 ring-offset-2 ring-black"></div>
          <div className="md:w-6 md:h-6 w-4 h-4 rounded-full shadow-md bg-[#53313d]"></div>
          <div className="md:w-6 md:h-6 w-4 h-4 rounded-full shadow-md bg-[#f29eba]"></div>
        </div>
        <p className="text-sm md:text-base mt-5">
          {product?.description}
        </p>
        {/* Size Wrapper */}
        <p className="font-bold text-xl md:text-2xl mt-3">$ {product?.price}</p>
        <div className="flex items-center mt-5 md:mt-10 gap-4">
          <div onClick={handleIncrement} className="flex justify-center cursor-pointer items-center p-2 rounded-md border border-black">
            <LuMinus className="text-lg " />
          </div>
          <p className="text-lg font-bold">{quantity}</p>
          <div onClick={handleDecrement} className="flex justify-center cursor-pointer items-center p-2 rounded-md bg-black ">
            <LuPlus className="text-lg text-white " />
          </div>
        </div>
        <div className="flex w-full justify-center gap-5 mt-8 mb-10 md:mt-16">
          <button onClick={()=> handleAddToCart()} className="flex justify-center items-center gap-3 border w-1/2 h-14 font-bold text-xl rounded-xl  border-black">
            
            {cartLoading ? (
                <ButtonLoading color="black" size="4" />
              ) : (
                cartSuccess ? <IoMdCheckmark className="text-base md:text-xl" /> :
                // <FaPlus className="border border-black bg-black text-white rounded-md p-2 text-4xl" />
                <p>Add to cart</p>
              )}
            
          </button>
          <button className="flex justify-center items-center gap-5 bg-black text-white w-1/2 h-14 font-bold text-xl rounded-xl  ">
            Buy now
          </button>
        </div>
      </div>
    </div>
    )}
    
    </>
  );
};

export default SingleProduct;
