import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
        setError(true)
      }finally{
        setLoading(false);
      }

    };
    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider value={{loading,error,products}}>
      {children}
    </ProductContext.Provider>
  );
};
