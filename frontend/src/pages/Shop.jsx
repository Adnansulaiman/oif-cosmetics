import ShopThumb from "../assets/images/shop-image-1.jpg";
import ProductCard from "../components/ProductCard";
import ShopFilter from "../components/ShopFilter";
// import { IoIosClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useState, useContext, useEffect, useRef } from "react";
import { ProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";
import axios from "axios";

const Shop = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (filterRef.current && !filterRef.current.contains(event.target)) {
            setFilterOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [setFilterOpen]);
  const [filters,setFilters] = useState({
    category:[],
    // price:{min:null,max:null},
    skinType:[],
    ingredients:[]
  })
  const [products,setProducts] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchFilteredProducts = async()=>{
      const query = new URLSearchParams();

      if(filters.category.length>0){
        query.append("category",filters.category.join(","));
      }
      // if(filters.price.min || filters.price.max){
      //   if(filters.price.min) query.append('minPrice',filters.price.min);
      //   if(filters.price.max) query.append('maxPrice',filters.price.max);
      // }
      if(filters.skinType.length>0){
        query.append("skinType",filters.skinType.join(","));
      }
      if(filters.category.length>0){
        query.append("ingredients",filters.ingredients.join(","));
      }
      // console.log(filters)
      try{
        const response = await axios.get(`http://localhost:3000/api/products?${query.toString()}`);
        setProducts(response.data)
        // console.log(products)
      }catch(err){
        console.log(err)
      }
      finally{
        setLoading(false);
      }
    }
    fetchFilteredProducts();
  },[filters])

  // const { products, loading } = useContext(ProductContext);
 
  return (
    <>
      {products && (
        <div className="bg-contain bg-secondary ">
          <div className="pt-24 mx-4  md:mx-12 text-white ">
            <div
              className="  rounded-2xl h-52 md:h-96 bg-cover bg-center p-10"
              style={{ backgroundImage: `url(${ShopThumb})` }}
            >
              <h1 className="text-3xl md:text-7xl font-bold max-w-5xl  ">
                We Know Everthing About Your Skin .
              </h1>
              <p className="text-sm md:text-lg mt-3">
                Discover your natural beauty with a marketplace of skincare
                products from the world's best brands{" "}
              </p>
            </div>
            <div className="flex mt-6 gap-4">
              {/* <ShopFilter /> */}
              <div className="bg-gray-400 pb-10  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 w-full   rounded-2xl flex flex-col text-black ">
                {filterOpen && (
                    <div className="" ref={filterRef}>
                        <ShopFilter filters={filters} setFilters={setFilters} />
                    </div>
                )}
                <div className=" bg-gray-100 py-4 m-2 rounded-lg flex justify-between px-5 items-center">
                  <div
                    className="flex  justify-center cursor-pointer items-center"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <p className="font-semibold">Filter</p>
                    <CiFilter className="mt-1" />
                  </div>

                  <div className="flex gap-1 justify-center cursor-pointer items-center">
                    <p className="font-semibold">Sort</p>
                    <IoIosArrowDown className="mt-1" />
                  </div>
                </div>
                <div className="flex gap-2 md:gap-10  justify-center flex-wrap px-11 ">
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default Shop;
