import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);

  const updateWishlist = (newWishlist) => {
    setWishlistData(newWishlist);
  };

  return (
    <UserContext.Provider value={{ wishlistData, updateWishlist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);
