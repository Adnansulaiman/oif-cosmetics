import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [cartData,setCartData] = useState([])
  const [wishlistData, setWishlistData] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  // const updateCart = (newCart)=>{
  //   setCartData(newCart)
  // }
  const updateWishlist = (newWishlist) => {
    setWishlistData(newWishlist);
  };
  // console.log('context cart data : ',cartData)

  // Fetch cart data when the app starts
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/getcart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response from get Cart : ",response.data)
        setCartData(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setCartLoading(false);
      }
    };
    fetchCartProducts();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/addcart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response from add Cart : ",response.data)
      setCartData(response.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };


  const clearCart = async () =>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/resetcart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Reset cart!")
      setCartData(response.data.cart);
    } catch (err) {
      console.error("Error reseting cart:", err);
    }
  }
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/removecart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartData(response.data.cart);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const incrementQuantity = async (productId) =>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/incrementcart/${productId}`,{},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartData(response.data.cart);
    } catch (err) {
      console.error("Error increment cart quantity :", err);
    }
  }

  const decrementQuantity = async (productId) =>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/decrementcart/${productId}`,{},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartData(response.data.cart);
    } catch (err) {
      console.error("Error Decrement cart quantity :", err);
    }
  }
  return (
    <UserContext.Provider
    value={{ wishlistData, cartData, cartLoading, addToCart, removeFromCart ,incrementQuantity,decrementQuantity,clearCart}}
  >
    {children}
  </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);
