import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    skinType: [],
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch products from the API based on filters
  const fetchProducts = async () => {
    const query = new URLSearchParams();

    if (filters.category.length > 0) {
      query.append("category", filters.category.join(","));
    }
    if (filters.skinType.length > 0) {
      query.append("skinType", filters.skinType.join(","));
    }
    if (filters.ingredients.length > 0) {
      query.append("ingredients", filters.ingredients.join(","));
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products?${query.toString()}`
      );
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update filters and refetch products
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Automatically fetch products whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        filters,
        updateFilters,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct =()=> useContext(ProductContext);