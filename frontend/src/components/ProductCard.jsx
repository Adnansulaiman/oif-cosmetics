/* eslint-disable react/prop-types */
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonLoading from "./ButtonLoading";
import { useAuth } from "../context/AuthContext";
import { IoMdCheckmark } from "react-icons/io";
import { useUserInfo } from "../context/userContext";

const ProductCard = ({ product, onRemoveFromWishlist }) => {
  // const {setCartData} = useUserInfo()
  const [wishlistData, setWishlistData] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  // const [cartData, setCartData] = useState(null);
  const [cartSuccess,setCartSuccess] = useState(false)
  const {addToCart} = useUserInfo()
  const { userData } = useAuth();
  // console.log(userData?.wishlist)
  useEffect(() => {
    if (userData?.wishlist) {
      setWishlistData(userData.wishlist);
    }
  }, [userData]);

  const handleAddToCart = async ( e) => {
    e.stopPropagation(); // Prevent Link navigation
    e.preventDefault();
    try {
      setCartLoading(true);
      await addToCart(product._id,1);
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

  // const handleAddToCart = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   addToCart(product._id,1);
  // };

  const addToWishlist = async (id, e) => {
    e.stopPropagation(); // Prevent Link navigation
    e.preventDefault();
    try {
      setWishlistLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/wishlist/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlistData(response.data?.wishlist);
      setWishlistMessage(response.data.message);
      // Notify parent (Wishlist) about the removal
      if (alreadyWishlist !== -1 && onRemoveFromWishlist) {
        onRemoveFromWishlist(id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWishlistLoading(false);
    }
  };
  // console.log(wishlistData);

  const alreadyWishlist = wishlistData?.findIndex(
    (item) => item.productId === product._id
  );

  return (
    <Link to={`/product/${product?._id}`}>
      <div
        className="hover:scale-105 w-44 h-44 sm:w-52 sm:h-52 md:w-72 md:h-72 flex flex-col justify-between py-3 rounded-2xl bg-cover bg-center mt-5 md:mb-10 drop-shadow-md"
        style={{ backgroundImage: `url(${product?.images[0]})` }}
      >
        <div className="flex justify-between px-3 items-center">
          <p className="font-semibold text-xs md:text-base">{product?.brand}</p>
          <div
          
            onClick={(e) => addToWishlist(product?._id, e)}
            className="flex z-50 justify-center items-center w-6 h-6 md:w-9 md:h-9 bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30"
          >
            {wishlistLoading ? (
              <ButtonLoading color="black" size="4" />
            ) : alreadyWishlist === -1 ? (
              <FaRegHeart className="hover:scale-110 cursor-pointer text-xs md:text-base" />
            ) : (
              <FaHeart className="hover:scale-110 cursor-pointer text-xs md:text-base" />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 mx-3 p-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-xs md:text-base font-semibold">
              {product?.name}
            </h1>
            <p className="text-xs">$ {product?.price}</p>
          </div>
          <div className="flex">
            <div
              onClick={handleAddToCart}
              // onClick={(e) => addToCart(product?._id, e)}
              className="flex justify-center items-center w-6 h-6 md:w-9 md:h-9 bg-gray-400 rounded-md md:rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30"
            >
              {/* <FaPlus className="hover:scale-110 text-xs md:text-base cursor-pointer" /> */}

              {cartLoading ? (
                <ButtonLoading color="black" size="4" />
              ) : (
                cartSuccess ? <IoMdCheckmark className="text-xs md:text-base" /> :
                <FaPlus className="hover:scale-110 text-xs md:text-base cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
